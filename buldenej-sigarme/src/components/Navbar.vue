<script setup>
import { ref } from 'vue'

const isPanelOpen = ref(false)

function toggleSidePanel() {
  isPanelOpen.value = !isPanelOpen.value
}

function closeSidePanel() {
  isPanelOpen.value = false
}
</script>

<template>
  <nav class="navbar w-full rounded-xl px-4 py-2 flex justify-between items-center" id="topNavbar">
    <div class="flex items-center left-items">
      <a
        href="https://discord.gg/B7rrxRERsx"
        target="”_blank”"
        class="nav-item text-white hover:text-yellow-400"
        >Discord</a
      >
    </div>
    <div class="flex items-center left-items">
      <a href="#" class="nav-item text-white hover:text-yellow-400">Conventions</a>
    </div>
    <div class="flex items-center separator">
      <span class="logo-separator text-yellow-500 mx-2">
        <img src="../assets/images/NavIMG.webp" alt="logo" class="h-8" />
      </span>
    </div>
    <div class="flex items-center right-items">
      <a
        href="mailto:buldenej@gmail.com"
        target="”_blank”"
        class="nav-item text-white hover:text-yellow-400"
        >Contact</a
      >
    </div>
    <div class="flex items-center right-items">
      <a
        href="https://fr.tipeee.com/buldenej"
        target="”_blank”"
        class="nav-item text-white hover:text-yellow-400"
        >Soutien</a
      >
      <div class="hamburger" @click="toggleSidePanel">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </nav>
  <div :class="['side-panel', { 'side-panel-open': isPanelOpen }]" @click="closeSidePanel">
    <div class="side-panel-content" @click.stop>
      <a
        href="https://discord.gg/B7rrxRERsx"
        target="”_blank”"
        class="nav-item text-white hover:text-yellow-400"
        @click="closeSidePanel"
        >Discord</a
      >
      <a href="#" class="nav-item text-white hover:text-yellow-400" @click="closeSidePanel"
        >Conventions</a
      >
      <a
        href="mailto:buldenej@gmail.com"
        target="”_blank”"
        class="nav-item text-white hover:text-yellow-400"
        @click="closeSidePanel"
        >Contact</a
      >
      <a
        href="https://fr.tipeee.com/buldenej"
        target="”_blank”"
        class="nav-item text-white hover:text-yellow-400"
        @click="closeSidePanel"
        >Soutien</a
      >
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'MedievalSharp';
  src: url('../assets/fonts/MedievalSharp-Regular.ttf') format('truetype');
}

.navbar {
  width: 928px;
  margin-top: 1.5rem;
  background-color: rgba(0, 0, 0, 1);
  border: 0.5px solid #c5a643;
  backdrop-filter: blur(16px);
  font-family: 'MedievalSharp', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.logo-separator img {
  height: 30px; /* Ensure consistent logo size */
  object-fit: cover;
  object-position: center;
}

.hamburger {
  display: none;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  transition: all 0.3s ease-in-out;
  background-color: #c5a643;
}

@media screen and (max-width: 762px) {
  .left-items .nav-item,
  .right-items .nav-item {
    display: none;
  }
  .hamburger {
    display: block;
  }

  /* Adjust the image size for mobile */
  .logo-separator img {
    height: auto;
    width: 90%; /* Adjust width as needed */
    max-width: 100%;
  }
}

/* Side panel styles */
.side-panel {
  position: fixed;
  top: 0;
  right: -100%;
  width: 70%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  transition: right 0.3s ease-in-out;
}

.side-panel-open {
  right: 0;
}

.side-panel-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 80px;
}

.side-panel-content .nav-item {
  padding: 8px 16px;
  border-bottom: 1px solid #c5a643;
  width: 100%;
}
</style>
