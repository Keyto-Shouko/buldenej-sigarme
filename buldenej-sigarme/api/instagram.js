import fetch from 'node-fetch';
import { supabaseServiceRole } from '../src/supabase';

export default async function handler(req, res) {
  try {
    // Fetch latest Instagram post
    const response = await fetch('https://instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"17825641829","first":1,"after":null}');
    const data = await response.json();
    const latestPost = data.data.user.edge_owner_to_timeline_media.edges[0].node;
    const postUrl = `https://www.instagram.com/p/${latestPost.shortcode}/`;

    // Update the first row in the buldenejInsta table with the latest post URL
    const { error } = await supabaseServiceRole
      .from('buldenejInsta')
      .update({ url: postUrl })
      .eq('id', 1);

    if (error) {
      console.error('Error updating Instagram posts:', error);
      return res.status(500).json({ error: 'Error updating Instagram posts' });
    }

    res.status(200).json({ message: 'Latest post updated successfully' });
  } catch (error) {
    console.error('Error updating Instagram posts:', error);
    res.status(500).json({ error: 'Error updating Instagram posts' });
  }
}
