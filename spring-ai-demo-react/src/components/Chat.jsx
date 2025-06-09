import React, { useState } from 'react';

export default function Chat() {
    const [prompt, setPrompt] = useState(""),
        [loading, setLoading] = useState(false),
        [chatHistory, setChatHistory] = useState([]);

    const sendMessage = async () => {
        if (!prompt.trim()) return;

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/ask-ai-options?prompt=${prompt}`);
            const text = await response.text();
            setChatHistory(prev => [...prev, { question: prompt, answer: text }]);
            setPrompt("");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Ask to AI</h2>

            <div className="chat-responses">
                {chatHistory.map((entry, index) => (
                    <div key={index} className="chat-entry">
                        <p><strong>You:</strong> {entry.question}</p>
                        <p><strong>AI:</strong> {entry.answer}</p>
                    </div>
                ))}
            </div>

            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Enter your prompt for AI'
            />

            <div className="send-container">
                <button onClick={sendMessage} disabled={loading}>
                    {loading ? "Sending..." : "Send Prompt"}
                </button>
                {loading && <div className="spinner"></div>}
            </div>
        </div>
    );
}
