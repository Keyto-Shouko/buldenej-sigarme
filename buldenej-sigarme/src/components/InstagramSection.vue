<template>
  <div class="p-8 min-h-screen InstaSection">
    <div class="flex flex-col md:flex-row md:justify-center">
      <!-- Buldenej Section -->
      <div class="flex flex-col w-full md:w-1/2 md:ml-5 mb-4">
        <div class="text-center mb-4 text-yellow-300 text-lg font-semibold Artists">Buldenej</div>
        <div class="grid space-y-1 gap-4 justify-center">
          <InstagramPost v-for="post in column1" :key="post.id" :msg="post.url" />
        </div>
      </div>
      
      <!-- Sigarme Section -->
      <div class="flex flex-col w-full md:w-1/2 md:ml-5">
        <div class="text-center mb-4 text-yellow-300 text-lg font-semibold Artists">Sigarme</div>
        <div class="grid space-y-1 gap-4 justify-center">
          <!-- Check if Sigarme has valid posts; if not, embed the profile -->
          <template v-if="validSigarmePosts.length > 0">
            <InstagramPost v-for="post in validSigarmePosts" :key="post.id" :msg="post.url" />
          </template>
          <template v-else>
            <div class="profile-embed">
              <blockquote
                class="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/sigarmetwitch/"
                data-instgrm-version="14"
                style="
                  background: #fff;
                  border: 0;
                  border-radius: 3px;
                  box-shadow:
                    0 0 1px 0 rgba(0, 0, 0, 0.5),
                    0 1px 10px 0 rgba(0, 0, 0, 0.15);
                  margin: 1px;
                  max-width: 540px;
                  min-width: 326px;
                  padding: 0;
                  width: 99.375%;
                  width: -webkit-calc(100% - 2px);
                  width: calc(100% - 2px);
                "
              >
                <a href="https://www.instagram.com/sigarmetwitch/" target="_blank">Voir le profil de Sigarme sur Instagram</a>
              </blockquote>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

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
      column2: [],
      validSigarmePosts: []  // This will hold only valid posts for Sigarme
    };
  },
  async mounted() {
    await this.fetchInstagramPosts();
    this.loadInstagramEmbedScript(); // Load the Instagram embed script for profiles
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

        this.column1 = buldenejData || [];
        this.column2 = sigarmeData || [];

        // Filter out Sigarme posts that have a valid URL
        this.validSigarmePosts = this.column2.filter(post => post.url && post.url.trim() !== '');

      } catch (error) {
        console.error('Unexpected error:', error);
      }
    },
    loadInstagramEmbedScript() {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      } else {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }
}
</script>

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

.profile-embed {
  display: flex;
  justify-content: center;
}
</style>
