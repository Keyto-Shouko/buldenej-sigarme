import fetch from 'node-fetch';
import { supabaseServer } from '../src/supabaseServer.js';

export default async function handler(req, res) {
  try {
    // get token from env
    const token = process.env.INSTAGRAM_TOKEN;
    // Fetch latest Instagram post
    const response = await fetch('https://graph.instagram.com/me/media?fields=permalink&limit=1&access_token=' + token);
    const data = await response.json();
    const latestPost = data.permalink;

    // Update the first row in the buldenejInsta table with the latest post URL
    const { error } = await supabaseServer
      .from('buldenejInsta')
      .update({ url: latestPost })
      .eq('id', 1);

    if (error) {
      console.error('Error updating Instagram posts:', error);
      return res.status(500).json({ error: 'Error updating Instagram posts', details : data });
    }

    res.status(200).json({ message: 'Latest post updated successfully' });
  } catch (error) {
    console.error('Error updating Instagram posts:', error);
    res.status(500).json({ error: 'Error updating Instagram posts' });
  }
}