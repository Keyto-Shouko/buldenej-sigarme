<script>
import { supabase } from '../supabase';

export default {
  data() {
    return {
      bgColor: '#ffffff'
    };
  },
  methods: {
    async updateBgColor() {
      await supabase
        .from('settings')
        .upsert({ id: 1, bgColor: this.bgColor });
      document.body.style.backgroundColor = this.bgColor;
    }
  },
  async created() {
    const { data } = await supabase
      .from('settings')
      .select('bgColor')
      .eq('id', 1)
      .single();
    if (data) {
      this.bgColor = data.bgColor;
      document.body.style.backgroundColor = this.bgColor;
    }
  }
};
</script>

<template>
    <div>
      <h2>Admin Panel</h2>
      <div>
        <label for="bgColor">Background Color:</label>
        <input type="color" v-model="bgColor" @change="updateBgColor" />
      </div>
    </div>
  </template>
  
<style scoped>



</style>
  