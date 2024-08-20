<script setup>
import Background from '../components/Background.vue'
import Navbar from '../components/Navbar.vue'
import Conventions from '../components/Conventions.vue'
import ScrollTop from '../components/ScrollTop.vue'
</script>

<template>
  <div class="main-layout">
    <Background />
    <header class="sticky top-0 z-50 w-full flex justify-center items-center">
      <Navbar />
    </header>
    <main class="flex-grow w-full">
      <Conventions />
      <router-view />
      <ScrollTop />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
