import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const instagramApiUrl = process.env.INSTAGRAM_API_URL;

async function updateInstagramPost() {
  try {
    // Debug: Print the Instagram API URL
    console.log('Instagram API URL:', instagramApiUrl);

    // Fetch latest Instagram post
    const response = await fetch(instagramApiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.statusText}`);
    }

    const data = await response.json();
    const latestPost = data?.data?.user?.edge_owner_to_timeline_media?.edges[0]?.node;
    if (!latestPost) {
      throw new Error('Invalid Instagram response structure');
    }

    const postUrl = `https://www.instagram.com/p/${latestPost.shortcode}/`;

    // Update the first row in the buldenejInsta table with the latest post URL
    const { error } = await supabase
      .from('buldenejInsta')
      .update({ url: postUrl })
      .eq('id', 1);

    if (error) {
      console.error('Error updating Instagram posts:', error);
      return;
    }

    console.log('Latest post updated successfully');
  } catch (error) {
    console.error('Error updating Instagram posts:', error);
  }
}

updateInstagramPost();
