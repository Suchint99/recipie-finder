import React, { useState } from 'react';
import axios from 'axios';

const CreateRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/recipes/save', {
        name,
        ingredients: ingredients.split(','),
        instructions: instructions.split('.'),
      });
      alert('Recipe saved!');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Recipe name"
      />
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (comma-separated)"
      />
      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions (sentence-separated)"
      />
      <button type="submit">Save Recipe</button>
    </form>
  );
};

export default CreateRecipe;