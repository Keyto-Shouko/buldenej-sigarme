<template>
    <nav class="navbar w-full rounded-xl px-4 py-2 flex justify-between">
      <div class="nav-item-container">
        <router-link to="/">
          <p class="nav-item home-logo">
            Home
          </p>
        </router-link>
        <p class="nav-item admin-panel">
          Admin Panel
        </p>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'AdminNavbar'
  }
  </script>
  
  <style scoped>
  .navbar {
  width: 928px;
  margin-top: 1.5rem;
  background-color: rgba(0, 0, 0, 1);
  border: 0.5px solid #c5a643;
  font-family: 'MedievalSharp', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  font-size: 24px;
}
  
  .nav-item-container {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .nav-item {
    margin: 0 10px;
    text-decoration: none;
    color: white;
  }
  
  .admin-panel {
    flex: 1;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    /* responsive width for mobile */
    .navbar {
      width: 100%;
    }
  }
  </style>
  