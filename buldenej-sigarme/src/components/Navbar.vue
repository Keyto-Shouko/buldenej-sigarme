<script setup></script>

<template>
  <nav class="navbar w-full rounded-lg px-4 py-2 flex justify-around items-center">
    <a href="#" class="nav-item text-white hover:text-yellow-400">Discord</a>
    <a href="#" class="nav-item text-white hover:text-yellow-400">Conventions</a>
    <div class="flex items-center">
      <span class="logo-separator text-yellow-500 mx-2">
        <img src="../assets/images/NavIMG.webp" alt="logo" class="h-8" />
      </span>
    </div>
    <a href="#" class="nav-item text-white hover:text-yellow-400">Contact</a>
    <a href="#" class="nav-item text-white hover:text-yellow-400">Soutien</a>
  </nav>
</template>

<style scoped>
@font-face {
  font-family: 'MedievalSharp';
  src: url('../assets/fonts/MedievalSharp-Regular.ttf') format('truetype');
}

nav {
  width: 928px;
  margin-top: 1.5rem;
  background-color: rgba(0, 0, 0, 1);
  border: 0.5px solid #c5a643;
  backdrop-filter: blur(16px);
  font-family: 'MedievalSharp', sans-serif;
}

.logo-separator img {
  height: 30px; /* Ensure consistent logo size */
  object-fit: cover;
  object-position: center;
}
</style>
