package com.ai.SpringAiDemo;


import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
public class GenAiController {
    private final ChatService chatService;
    private final ImageService imageService;
    private final RecipeService recipeService;
    private final ChainWorkflow chainWorkflow;


    public GenAiController(ChatService chatService, ImageService imageService, RecipeService recipeService,
                           ChainWorkflow chainWorkflow) {
        this.chatService = chatService;
        this.imageService =imageService;
        this.recipeService = recipeService;
        this.chainWorkflow=chainWorkflow;
    }

    @GetMapping("/ask-ai")
    public String getResponse(@RequestParam String prompt){
        return chatService.getResponse(prompt);
    }

    @GetMapping("/ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt){
        return chatService.getResponseOptions(prompt);
    }

//non funziona perchè credo che il modello che sto utilizzando non lo supporti
    @GetMapping("/generate-img")
    public void generateImages (HttpServletResponse response, @RequestParam String prompt) throws IOException {
        ImageResponse imageResponse= imageService.generateImage(prompt);
        String imageUrl= imageResponse.getResult().getOutput().getUrl();
        response.sendRedirect(imageUrl);
    }

    @GetMapping("/recipe-creator")
    public String recipeCreator(@RequestParam String ingredients,
                                @RequestParam(defaultValue = "italiana") String cuisine,
                                @RequestParam(defaultValue = "nessuna") String dietaryRestrictions) {
        return recipeService.createRecipe(ingredients, cuisine, dietaryRestrictions);
    }
    @PostMapping("/chain-workflow")
    public String analyzeText(@RequestBody String text) {
        return chainWorkflow.chain(text);
    }
}
