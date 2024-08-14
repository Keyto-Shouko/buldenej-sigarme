<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';

const bgColor1 = ref('#9e5021'); // Default color if fetch fails
const bgColor2 = ref('#47240f'); // Default color if fetch fails

// Function to fetch bgColor1 and bgColor2 from the database
const fetchBackgroundColors = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('bgColor1, bgColor2')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching background colors:', error);
    return;
  }

  if (data) {
    bgColor1.value = data.bgColor1 || bgColor1.value; // Fallback to default if null
    bgColor2.value = data.bgColor2 || bgColor2.value; // Fallback to default if null
  }
};

// Fetch colors on component mount
onMounted(fetchBackgroundColors);
</script>

<template>
  <div
    class="background"
    :style="{ background: `linear-gradient(to bottom, ${bgColor1}, ${bgColor2})` }"
  ></div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensure it stays in the background */
}
</style>
