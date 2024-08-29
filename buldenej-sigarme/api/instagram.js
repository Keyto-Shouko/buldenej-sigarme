import fetch from 'node-fetch';
import { supabaseServer } from '../src/supabaseServer.js';

export default async function handler(req, res) {
  try {
    // Get token from environment variables
    const token = process.env.INSTAGRAM_TOKEN;

    // Check if the token is available
    if (!token) {
      console.error('Instagram token is not set in environment variables.');
      return res.status(500).json({ 
        error: 'Instagram token is not set in environment variables.' 
      });
    }

    // Debugging: Log the token (make sure to remove or obfuscate this in production)
    console.log('Using Instagram token:', token);

    // Fetch the latest Instagram post
    const response = await fetch(`https://graph.instagram.com/me/media?fields=permalink&limit=1&access_token=${token}`);

    // Check if the response is not OK
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error fetching Instagram posts:', response.status, response.statusText, errorResponse);
      return res.status(500).json({ 
        error: 'Error fetching Instagram posts from API', 
        status: response.status, 
        statusText: response.statusText,
        details: errorResponse
      });
    }

    const data = await response.json();

    // Check if data is in the expected format
    if (!data || !data.data || data.data.length === 0 || !data.data[0].permalink) {
      console.error('Unexpected data format from Instagram API:', JSON.stringify(data, null, 2));
      return res.status(500).json({ 
        error: 'Unexpected data format from Instagram API', 
        details: data 
      });
    }

    const latestPost = data.data[0].permalink;

    // Debugging: Log the latest post URL
    console.log('Latest Instagram post URL:', latestPost);

    // Update the first row in the buldenejInsta table with the latest post URL
    const { data: updateData, error: supabaseError } = await supabaseServer
      .from('buldenejInsta')
      .update({ url: latestPost })
      .eq('id', 1);

    // Check for Supabase errors
    if (supabaseError) {
      console.error('Error updating Instagram post in Supabase:', supabaseError);
      return res.status(500).json({ 
        error: 'Error updating Instagram post in Supabase', 
        details: supabaseError.message 
      });
    }

    // Check if the update actually modified any rows
    if (!updateData || updateData.length === 0) {
      console.warn('No rows updated in Supabase. Please check if the row with id=1 exists.');
      return res.status(404).json({ 
        message: 'No rows updated. Please check if the row with id=1 exists.' 
      });
    }

    // Log success message and return a successful response
    console.log('Latest post updated successfully in Supabase:', updateData);
    res.status(200).json({ 
      message: 'Latest post updated successfully', 
      data: updateData 
    });
  } catch (error) {
    // Log unexpected errors
    console.error('Unexpected error occurred:', error);
    res.status(500).json({ 
      error: 'Unexpected error occurred', 
      details: error.message 
    });
  }
}
