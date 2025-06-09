import { useState } from "react";


export default function ImageGenerator() {
    const [prompt, setPrompt] = useState(""),
        [imageUrls, setImageUrls] = useState([]);

    const generateImage = async () => {
        try {
            const response = await fetch(`http://localhost:8080/generate-img?prompt=${prompt}`)
            const urls = await response.json();
            setImageUrls(urls);

        } catch (error) {
            console.error("Error generating image:", error);
            alert("Failed to generate image. Please try again.");
        }
    }
    return (
        <div className="tab-content">
            <h2>Generate Image</h2>
            <input type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter prompt for image here"
            />
            <button onClick={generateImage}>Generate Image</button>
            <div className="image-grid">
                {imageUrls.map((url, index) => (
                    <div key={index} className="image-item">
                        <img src={url} alt={`Generated ${index}`} />
                    </div>
                ))}
                {[...Array(4 - imageUrls.length)].map((_, index) => (
                    <div key={index + imageUrls.length} className="empty-image-slot">
                    </div>
                ))}
            </div>
        </div>
    );
}
