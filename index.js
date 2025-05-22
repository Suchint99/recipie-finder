const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (for saving user recipes)
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// Recipe API Configuration
const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

// Fetch recipes from Edamam API
app.get('/api/recipes', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
    );
    res.json(response.data.hits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Save user-created recipe (example endpoint)
const Recipe = require('./models/Recipe');
app.post('/api/recipes/save', async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const newRecipe = new Recipe({ name, ingredients, instructions });
  await newRecipe.save();
  res.status(201).json(newRecipe);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));