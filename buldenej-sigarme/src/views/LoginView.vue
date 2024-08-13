<script setup>
import Background from '../components/Background.vue'
</script>

<template>
  <Background />
  <div class="login-layout">
    <router-view />
  </div>
</template>

<style scoped>


.login-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}
</style>
