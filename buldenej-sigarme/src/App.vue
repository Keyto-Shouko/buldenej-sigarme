<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Background from './components/Background.vue'
import Center from './components/Center.vue'
</script>

<template>
  <div id="app-container" class="flex flex-col min-h-screen w-full flex-1">
    <header class="sticky top-0 z-50 w-full">
      <Navbar />
    </header>
    <main class="flex-grow w-full">
      <Center />
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}

main {
  display: flex;
  justify-content: center;
}

header {
  /* center the header */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
