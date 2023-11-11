const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.static('public'));
app.use(express.json());

// Endpoint to get a random quote
app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to search quotes by author
app.get('/api/quote/search', async (req, res) => {
  const { author } = req.query;

  if (!author) {
    return res.status(400).json({ error: 'Author name is required for search.' });
  }

  try {
    const response = await axios.get(`https://api.quotable.io/quotes?author=${author}`);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
