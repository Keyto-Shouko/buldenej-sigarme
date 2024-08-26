import fetch from 'node-fetch';
import { supabaseServer } from '../src/supabaseServer.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // or specify your origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Fetch latest Instagram post
    const response = await fetch('https://instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"17825641829","first":1,"after":null}');
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
    const { error } = await supabaseServer
      .from('buldenejInsta')
      .update({ url: postUrl })
      .eq('id', 1);

    if (error) {
      console.error('Error updating Instagram posts:', error);
      return res.status(500).json({ error: 'Error updating Instagram posts', details: error });
    }

    res.status(200).json({ message: 'Latest post updated successfully' });
  } catch (error) {
    console.error('Error updating Instagram posts:', error);
    return res.status(500).json({ error: 'Error updating Instagram posts', details: error.message });
  }
}