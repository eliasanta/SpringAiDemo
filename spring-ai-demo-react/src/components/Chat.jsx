import React, { useState } from 'react';

export default function Chat() {

    const [prompt, setPrompt] = useState(""),
        [chatResponse, setChatResponse] = useState(""),
        [loading, setLoading] = useState(false);
    const sendMessage = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/ask-ai-options?prompt=${prompt}`);
            setChatResponse(response.text());
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
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Enter your prompt for AI'
            />
            <button onClick={sendMessage}>send prompt</button>

            <div className="chat-responses">
                {loading ? (
                    <div className="spinner"></div>
                ) : (
                    <p>{chatResponse}</p>
                )}
            </div>
        </div>
    );
}
