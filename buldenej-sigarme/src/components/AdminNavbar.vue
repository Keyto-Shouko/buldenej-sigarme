<template>
    <div class="admin-navbar-container">
      <div class="nav-item-container">
        <p class="nav-item home-logo">
          Home
        </p>
        <p class="nav-item admin-panel">
          Admin Panel
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminNavbar'
  }
  </script>
  
  <style scoped>
  .admin-navbar-container {
    width: 928px;
    margin-top: 1.5rem;
    height: 30px;
    background-color: rgba(0, 0, 0, 1);
    border: 0.5px solid #c5a643;
    backdrop-filter: blur(16px);
    font-family: 'MedievalSharp', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
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
  
  .home-logo {
    position: absolute;
    left: 20px;
  }
  
  .admin-panel {
    flex: 1;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .admin-navbar-container {
      flex-direction: column;
      width: 100%;
    }
    .nav-item-container {
      flex-direction: column;
    }
    .nav-item {
      margin: 5px 0;
    }
    .home-logo {
      position: static;
    }
  }
  </style>
  