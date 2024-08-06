<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Background from './components/Background.vue'
import Center from './components/Center.vue'
import InstagramSection from './components/InstagramSection.vue'
import ScrollTop from './components/ScrollTop.vue'
</script>

<template>
  <div id="app-container" class="flex flex-col min-h-screen w-full flex-1">
    <Background />
    <header class="sticky top-0 z-50 w-full flex justify-center items-center">
      <Navbar />
    </header>
    <main class="flex-grow w-full">
      <Center />
      <InstagramSection />
      <RouterView />
      <ScrollTop />
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
  flex-direction: column;
  align-items: center;
  width: 100%;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
