<script setup>
import Background from '../components/Background.vue'
import AdminNavbar from '../components/AdminNavbar.vue'

</script>

<template>
    <Background />
    <AdminNavbar/>
    <div class="admin-layout">
      <router-view />
    </div>
  </template>
  
  <style scoped>
  .admin-layout {
    min-height: 100vh;
    width: 100%;
  }
  </style>
  