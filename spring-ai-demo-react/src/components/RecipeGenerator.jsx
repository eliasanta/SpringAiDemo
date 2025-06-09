import React, { useState } from 'react';
import './style/recipeGenerator.css';

export default function RecipeGenerator() {
    const [ingredients, setIngredients] = useState(""),
        [cuisine, setCuisine] = useState("any"),
        [loading, setLoading] = useState(false),
        [dietaryRestrictions, setDietaryRestrictions] = useState(""),
        [recipe, setRecipe] = useState("");

    const generateRecipe = async () => {
        if (!ingredients.trim()) {
            alert("Please enter some ingredients.");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/recipe-creator?ingredients=${encodeURIComponent(ingredients)}&cuisine=${cuisine}&dietaryRestrictions=${encodeURIComponent(dietaryRestrictions)}`);
            const data = await response.text();
            setRecipe(data);
        } catch (error) {
            console.error("Error generating recipe:", error);
            alert("Failed to generate recipe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recipe-generator">
            <h2>🍽️ Recipe Generator</h2>

            <div className="input-row">
                <div className="input-group">
                    <label>Ingredients (comma-separated):</label>
                    <input
                        className='ingredients-input'
                        type="text"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="e.g., chicken, tomatoes, basil"
                    />
                </div>
                <div className="input-group">
                    <label>Cuisine:</label>
                    <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                        <option value="any">Any</option>
                        <option value="italian">Italian</option>
                        <option value="mexican">Mexican</option>
                        <option value="indian">Indian</option>
                        <option value="japanese">Japanese</option>
                    </select>
                </div>
            </div>


            <label>Dietary Restrictions (optional):</label>
            <input
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="e.g., vegetarian, gluten-free"
            />

            <button onClick={generateRecipe} disabled={loading}>
                {loading ? "Generating..." : "Generate Recipe"}
            </button>
            {loading && <div className="spinner"></div>}

            {recipe && (
                <div className="recipe-output">
                    <h3>📝 Generated Recipe</h3>
                    <p>{recipe}</p>
                </div>
            )}
        </div>
    );
}
