<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await store.dispatch('login', { email: email.value, password: password.value })
    // Redirect to admin page after successful login
    router.push('/admin')
  } catch (error) {
    console.error('Login failed', error)
    // Handle login error (e.g., show a message to the user)
    alert('Erreur lors de la connexion. Veuillez vérifier vos identifiants.')
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Enter') {
    handleLogin()
  }
}

</script>

<template>
  <div class="login-container">
    <input v-model="email" @keydown="handleKeydown" type="email" placeholder="Email" class="input-field" />
    <input v-model="password" @keydown="handleKeydown" type="password" placeholder="Password" class="input-field" />
    <button @click="handleLogin" class="login-button">Login</button>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'MedievalSharp';
  src: url('../assets/fonts/MedievalSharp-Regular.ttf') format('truetype');
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height of the viewport */
}

.input-field {
  margin-bottom: 10px; /* Space between inputs */
  padding: 10px;
  width: 80%; /* Adjust width as needed */
  max-width: 400px; /* Max width for larger screens */
  box-sizing: border-box;
  border: 4px solid #c5a643;
  border-radius: 16px;
}

.login-button {
  padding: 10px 20px;
  width: 80%; /* Adjust width as needed */
  max-width: 400px; /* Max width for larger screens */
  box-sizing: border-box;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 1);
  color: rgba(197, 166, 67, 1);
  font-size: 24px;
  border: 1px solid #c5a643;
  border-radius: 16px;
  font-family: 'MedievalSharp', sans-serif;
}
</style>
  