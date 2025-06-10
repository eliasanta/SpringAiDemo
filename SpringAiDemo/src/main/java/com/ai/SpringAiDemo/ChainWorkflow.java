package com.ai.SpringAiDemo;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Implements the Prompt Chaining workflow pattern for decomposing complex tasks
 * into a sequence of LLM calls where each step processes the output of the previous one.
 */
@Service
public class ChainWorkflow {
    private static final String[] DEFAULT_SYSTEM_PROMPTS = {
            // Step 1
            """
        Extract only the numerical values and their associated metrics from the text.
        Format each as'value: metric' on a new line.
        Example format:
        92: customer satisfaction
        45%: revenue growth""",

            // Step 2
            """
        Convert all numerical values to percentages where possible.
        If not a percentage or points, convert to decimal (e.g., 92 points -> 92%).
        Keep one number per line.
        Example format:
        92%: customer satisfaction
        45%: revenue growth""",

            // Step 3
            """
        Sort all lines in descending order by numerical value.
        Keep the format 'value: metric' on each line.
        Example:
        92%: customer satisfaction
        87%: employee satisfaction""",

            // Step 4
            """
        Format the sorted data as a markdown table with columns:
        | Metric | Value |
        |:--|--:|
        | Customer Satisfaction | 92% | """
    };

    private final ChatClient chatClient;
    private final String[] systemPrompts;

    @Autowired // Non obbligatorio se è l'unico costruttore, ma buona pratica
    public ChainWorkflow(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
        this.systemPrompts = DEFAULT_SYSTEM_PROMPTS;
    }

    /**
     * Costruttore con injection e prompt personalizzati (opzionale).
     */
    public ChainWorkflow(ChatClient.Builder chatClientBuilder, String[] systemPrompts) {
        this.chatClient = chatClientBuilder.build();
        this.systemPrompts = systemPrompts;
    }

    /**
     * Esegue la catena di prompt in sequenza.
     */
    public String chain(String userInput) {
        int step = 0;
        String response = userInput;

        System.out.println(String.format("\nSTEP %s:\n %s", step++, response));

        for (String prompt : systemPrompts) {
            String input = String.format("{%s}\n {%s}", prompt, response);
            response = chatClient.prompt(input).call().content();
            System.out.println(String.format("\nSTEP %s:\n %s", step++, response));
        }

        return response;
    }
}
