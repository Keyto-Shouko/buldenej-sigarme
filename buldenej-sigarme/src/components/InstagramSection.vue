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
import InstagramPost from './InstagramPost.vue';
import { supabase } from '../supabase';

export default {
  components: {
    InstagramPost
  },
  data() {
    return {
      column1: [],
      column2: []
    };
  },
  async mounted() {
    await this.fetchInstagramPosts();
  },
  methods: {
    async fetchInstagramPosts() {
      try {
        // Fetch Buldenej Instagram posts
        const { data: buldenejData, error: buldenejError } = await supabase
          .from('buldenejInsta')
          .select('id, url')
          .order('id', { ascending: true });

        if (buldenejError) {
          console.error('Error fetching Buldenej Instagram posts:', buldenejError);
          return;
        }

        // Fetch Sigarme Instagram posts
        const { data: sigarmeData, error: sigarmeError } = await supabase
          .from('sigarmeInsta')
          .select('id, url')
          .order('id', { ascending: true });

        if (sigarmeError) {
          console.error('Error fetching Sigarme Instagram posts:', sigarmeError);
          return;
        }

        // Assuming both tables have exactly 3 posts each
        this.column1 = buldenejData || [];
        this.column2 = sigarmeData || [];
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }
  }
}
</script>
