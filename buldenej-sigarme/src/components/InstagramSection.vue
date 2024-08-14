<template>
  <div class="p-8 min-h-screen InstaSection">
    <div class="flex flex-col md:flex-row md:justify-center">
      <div class="flex flex-col w-full md:w-1/2 md:ml-5 mb-4">
        <div class="text-center mb-4 text-yellow-300 text-lg font-semibold Artists">Buldenej</div>
        <div class="grid space-y-1 gap-4 justify-center">
          <InstagramPost v-for="post in column1" :key="post.id" :msg="post.url" />
        </div>
      </div>
      <div class="flex flex-col w-full md:w-1/2 md:ml-5">
        <div class="text-center mb-4 text-yellow-300 text-lg font-semibold Artists">Sigarme</div>
        <div class="grid space-y-1 gap-4 justify-center">
          <InstagramPost v-for="post in column2" :key="post.id" :msg="post.url" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'MedievalSharp';
  src: url('../assets/fonts/MedievalSharp-Regular.ttf') format('truetype');
}

.Artists {
  font-family: 'MedievalSharp', sans-serif;
  color: rgba(197, 166, 67, 1);
  font-size: 44px;
  line-height: 44px;
}

.InstaSection {
  margin-top: 50px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .Artists {
    font-size: 24px;
    line-height: 24px;
  }

  .flex {
    justify-content: center; /* Center the columns on small screens */
  }

  .w-full {
    width: 100%; /* Allow some margin on smaller screens */
  }
}
</style>

<script>
import InstagramPost from './InstagramPost.vue'
import { supabase } from '../supabase';

export default {
  components: {
    InstagramPost
  },
  data() {
    return {
      column1: [],
      column2: []
    }
  },
  async mounted() {
    await this.fetchInstagramPosts();
  },
  methods: {
    async fetchInstagramPosts() {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('buldenejPost1, buldenejPost2, buldenejPost3, sigarmePost1, sigarmePost2, sigarmePost3')
          .eq('id', 1); // Assuming the row has an ID of 1

        if (error) {
          console.error('Error fetching Instagram posts:', error);
          return;
        }

        if (data && data.length > 0) {
          const row = data[0];
          // Split URLs into two columns
          this.column1 = [
            { id: 1, url: row.buldenejPost1 },
            { id: 2, url: row.buldenejPost2 },
            { id: 3, url: row.buldenejPost3 }
          ];
          this.column2 = [
            { id: 1, url: row.sigarmePost1 },
            { id: 2, url: row.sigarmePost2 },
            { id: 3, url: row.sigarmePost3 }
          ];
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
}
</script>
