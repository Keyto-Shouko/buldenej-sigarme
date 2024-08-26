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
const instagramApiUrl = process.env.INSTAGRAM_API_URL;

// Define the route to update Instagram post
app.get('/api/instagram', async (req, res) => {
  try {
    // Fetch Instagram data
    const response = await fetch(instagramApiUrl);
    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.statusText}`);
    }

    const data = await response.json();
    const latestPost = data?.data?.user?.edge_owner_to_timeline_media?.edges[0]?.node;
    if (!latestPost) {
      throw new Error('Invalid Instagram response structure');
    }

    const postUrl = `https://www.instagram.com/p/${latestPost.shortcode}/`;

    // Update Supabase
    const { error } = await supabase
      .from('buldenejInsta')
      .update({ url: postUrl })
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
