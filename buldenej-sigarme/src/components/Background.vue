<script setup></script>

<template>
  <div class="background"></div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, orange, darkorange);
  z-index: -1; /* Ensure it stays in the background */
}
</style>
