<template>
    <div class="conventions-container">
      <h1>CONVENTIONS - 2024</h1>
      <table>
        <thead>
          <tr>
            <th>Quoi?</th>
            <th>Où?</th>
            <th>Dates</th>
            <th>Stand</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="convention in conventions" :key="convention.id">
            <td>{{ convention.name }}</td>
            <td>{{ convention.location }}</td>
            <td>{{ formatDate(convention.start_date) }} - {{ formatDate(convention.end_date) }}</td>
            <td>{{ convention.stand }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { supabase } from '../supabase'; // Assuming you have a setup
  
  const conventions = ref([]);
  
  onMounted(async () => {
    const { data, error } = await supabase
      .from('conventions')
      .select('*');
  
    if (error) {
      console.error(error);
    } else {
      conventions.value = data;
    }
  });
  
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('fr-FR', options);
  };
  </script>
  
  <style scoped>
  .conventions-container {
    text-align: center;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
  }
  
  th {
    font-weight: bold;
    color: rgba(197, 166, 67, 1);
    font-family: 'MedievalSharp', sans-serif;
  }
  
  td {
    text-align: center;
    color : white;
  }

    h1 {
        font-family: 'MedievalSharp', sans-serif;
        color: #C4661F;
        font-size: 36px;
        margin-top: 25px;
    }
  </style>
  