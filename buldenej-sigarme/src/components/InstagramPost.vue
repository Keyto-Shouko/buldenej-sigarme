<template>
  <div ref="postContainer" :id="uniqueId">
    <!-- Only render the blockquote if the msg prop is valid -->
    <blockquote
      v-if="isLoaded && isValidMsg"
      class="instagram-media"
      :data-instgrm-permalink="msg"
      data-instgrm-version="14"
      style="
        background: #fff;
        border: 0;
        border-radius: 3px;
        box-shadow:
          0 0 1px 0 rgba(0, 0, 0, 0.5),
          0 1px 10px 0 rgba(0, 0, 0, 0.15);
        margin: 1px;
        max-width: 540px;
        min-width: 326px;
        padding: 0;
        width: 99.375%;
        width: -webkit-calc(100% - 2px);
        width: calc(100% - 2px);
      "
    >
      <a :href="msg" target="_blank">Voir cette publication sur Instagram</a>
    </blockquote>
    <div v-else class="placeholder">Loading...</div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';

const props = defineProps({
  msg: {
    type: String,
    required: true
  }
});

const isLoaded = ref(false);
const uniqueId = `instagram-post-${Math.random().toString(36).substr(2, 9)}`;

// Computed property to check if msg is valid
const isValidMsg = computed(() => {
  return props.msg && props.msg.startsWith('https://www.instagram.com/p/');
});

let observer;

onMounted(() => {
  if (isValidMsg.value) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadInstagramPost();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(document.getElementById(uniqueId));
  } else {
    console.error('InstagramPost component requires a valid msg prop');
  }
});

function loadInstagramPost() {
  isLoaded.value = true;
  try {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = '//www.instagram.com/embed.js';
    document.head.appendChild(script);

    script.onload = () => {
      window.instgrm.Embeds.process();
    };

    onBeforeUnmount(() => {
      document.head.removeChild(script);
      if (observer) observer.disconnect();
    });
  } catch (error) {
    console.error('Error loading Instagram embed script:', error);
  }
}
</script>

<style scoped>
.placeholder {
  background: #f0f0f0;
  height: 400px; /* Adjust height as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}
</style>
