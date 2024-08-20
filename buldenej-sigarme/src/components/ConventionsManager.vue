<template>
    <div class="conventions-container">
      <h1>Conventions</h1>
      <table>
        <thead>
          <tr>
            <th>Quoi?</th>
            <th>Où?</th>
            <th>Dates (Début - Fin)</th>
            <th>Stand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(convention, index) in conventions" :key="convention.id">
            <td><input v-model="convention.name" /></td>
            <td><input v-model="convention.location" /></td>
            <td>
              <input v-model="convention.start_date" type="date" />
              <span>-</span>
              <input v-model="convention.end_date" type="date" />
            </td>
            <td><input v-model="convention.stand" /></td>
            <td>
              <button @click="deleteConvention(index)">Supprimer</button>
            </td>
          </tr>
          <tr>
            <td><input v-model="newConvention.name" placeholder="Name" /></td>
            <td><input v-model="newConvention.location" placeholder="Location" /></td>
            <td>
              <input v-model="newConvention.start_date" type="date" placeholder="Start Date" />
              <span>-</span>
              <input v-model="newConvention.end_date" type="date" placeholder="End Date" />
            </td>
            <td><input v-model="newConvention.stand" placeholder="Stand" /></td>
            <td>
              <button @click="addConvention">Ajouter</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="saveConventions">Sauvegarder modifications</button>
    </div>
  </template>
  

  <script setup>
  import { ref, onMounted } from 'vue';
  import { supabase } from '../supabase';
  
  const conventions = ref([]);
  const newConvention = ref({
    name: '',
    location: '',
    start_date: '',
    end_date: '',
    stand: ''
  });
  
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
  
  const addConvention = async () => {
    try {
      const { data, error } = await supabase
        .from('conventions')
        .insert([
          {
            name: newConvention.value.name,
            location: newConvention.value.location,
            start_date: newConvention.value.start_date,
            end_date: newConvention.value.end_date,
            stand: newConvention.value.stand
          }
        ])
        .select();
  
      if (error) {
        console.error('Insert Error:', error.message);
      } else {
        conventions.value.push(...data);
        newConvention.value = {
          name: '',
          location: '',
          start_date: '',
          end_date: '',
          stand: ''
        };
      }
    } catch (error) {
      console.error('Error adding convention:', error);
    }
  };
  
  const deleteConvention = async (index) => {
    try {
      const conventionToDelete = conventions.value[index];
      const { error } = await supabase
        .from('conventions')
        .delete()
        .match({ id: conventionToDelete.id });
  
      if (error) {
        console.error('Delete Error:', error.message);
      } else {
        conventions.value.splice(index, 1);
      }
    } catch (error) {
      console.error('Error deleting convention:', error);
    }
  };
  
  const saveConventions = async () => {
    try {
      const updatedConventions = conventions.value.filter(convention => convention.id);
      const newConventions = conventions.value.filter(convention => !convention.id);
      console.log("updated conventions", updatedConventions, "newConventions", newConventions);
  
      // Update existing conventions
      if (updatedConventions.length > 0) {
        const { error: updateError } = await supabase
          .from('conventions')
          .upsert(updatedConventions, { onConflict: ['id'] });
  
        if (updateError) throw updateError;
      }
  
      // Insert new conventions
      if (newConventions.length > 0) {
        const { data, error } = await supabase
          .from('conventions')
          .insert(newConventions)
          .select();
  
        if (error) {
          console.error("Insert Error:", error.message);
        }
        if (data) {
          console.log("Inserted Data:", data);
          conventions.value.push(...data);
        }
      }
  
      // Remove deleted conventions from the database
      const existingIds = conventions.value.map(convention => convention.id).filter(Boolean);
      const { data: allConventions } = await supabase.from('conventions').select('id');
      const deletedIds = allConventions
        .map(convention => convention.id)
        .filter(id => !existingIds.includes(id));
  
      if (deletedIds.length > 0) {
        const { error: deleteError } = await supabase
          .from('conventions')
          .delete()
          .in('id', deletedIds);
  
        if (deleteError) {
          console.error("Delete Error:", deleteError.message);
        }
      }
  
    } catch (error) {
      console.error('Error saving conventions:', error);
    }
  };
  </script>
  
  <style scoped>
  .conventions-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  h1 {
        font-family: 'MedievalSharp', sans-serif;
        color: #C4661F;
        font-size: 36px;
        margin-top: 25px;
    }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  th {
    font-weight: bold;
    color: rgba(197, 166, 67, 1);
    font-family: 'MedievalSharp', sans-serif;
  }
  
  input {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
  
  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  