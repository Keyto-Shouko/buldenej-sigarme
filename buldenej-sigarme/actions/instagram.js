import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
import express from 'express';
import cors from 'cors';

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const APIUrl = process.env.INSTAGRAM_API_URL;
const token = process.env.INSTAGRAM_API_TOKEN;

// Define the route to update Instagram post
app.get('/api/instagram', async (req, res) => {
  try {
    // build the Instagram API URL, access token is already in the url but not the value
    const instagramApiUrl = `${APIUrl}?access_token=${token}`;
    const response = await fetch(instagramApiUrl);
    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.statusText}`);
    }

    const data = await response.json();
    const latestPost = data.permalink;
    if (!latestPost) {
      throw new Error('Invalid Instagram response structure');
    }

    // Update Supabase
    const { error } = await supabase
      .from('buldenejInsta')
      .update({ url: latestPost })
      .eq('id', 1);

    if (error) {
      console.error('Error updating Instagram posts:', error);
      return res.status(500).json({ error: 'Error updating Instagram posts', details: error.message });
    }

    console.log('Latest post updated successfully');
    res.status(200).json({ message: 'Latest post updated successfully' });

  } catch (error) {
    console.error('Error updating Instagram posts:', error);
    res.status(500).json({ error: 'Error updating Instagram posts', details: error.message });
  }
});

// Export the Express app as a serverless function
export default (req, res) => {
  app(req, res);
};
