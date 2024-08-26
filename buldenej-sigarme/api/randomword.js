// api/randomword.js

export default async function handler(req, res) {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word');
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching random word:', error);
      res.status(500).json({ error: 'Failed to fetch random word' });
    }
  }