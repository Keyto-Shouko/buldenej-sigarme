import fetch from 'node-fetch';
import { supabaseServer } from '../src/supabaseServer.js';

export default async function handler(req, res) {
  try {
    // get token from env
    const token = process.env.INSTAGRAM_TOKEN;

    // Check if token is available
    if (!token) {
      console.error('Instagram token is not set in environment variables.');
      return res.status(500).json({ error: 'Instagram token is not set in environment variables.' });
    }

    // Fetch latest Instagram post
    const response = await fetch(`https://graph.instagram.com/me/media?fields=permalink&limit=1&access_token=${token}`);

    if (!response.ok) {
      // Log if the fetch failed
      console.error('Error fetching Instagram posts:', response.status, response.statusText);
      return res.status(500).json({ error: 'Error fetching Instagram posts from API', status: response.status, statusText: response.statusText });
    }

    const data = await response.json();

    // Check if data is in the expected format
    if (!data || !data.data || data.data.length === 0 || !data.data[0].permalink) {
      console.error('Unexpected data format from Instagram API:', data);
      return res.status(500).json({ error: 'Unexpected data format from Instagram API', details: data });
    }

    const latestPost = data.data[0].permalink;

    // Update the first row in the buldenejInsta table with the latest post URL
    const { data: updateData, error: supabaseError } = await supabaseServer
      .from('buldenejInsta')
      .update({ url: latestPost })
      .eq('id', 1);

    if (supabaseError) {
      console.error('Error updating Instagram post in Supabase:', supabaseError);
      return res.status(500).json({ error: 'Error updating Instagram post in Supabase', details: supabaseError });
    }

    // Check if the update actually modified any rows
    if (!updateData || updateData.length === 0) {
      console.warn('No rows updated in Supabase. Please check if the row with id=1 exists.');
      return res.status(404).json({ message: 'No rows updated. Please check if the row with id=1 exists.' });
    }

    res.status(200).json({ message: 'Latest post updated successfully', data: updateData });
  } catch (error) {
    console.error('Unexpected error occurred:', error);
    res.status(500).json({ error: 'Unexpected error occurred', details: error.message });
  }
}
