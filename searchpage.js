import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/recipes?query=${query}`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
      />
      <button onClick={searchRecipes}>Search</button>
      
      <div className="recipe-list">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h3>{recipe.recipe.label}</h3>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <ul>
              {recipe.recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;