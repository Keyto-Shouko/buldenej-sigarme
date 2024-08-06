<template>
  <div class="p-8 min-h-screen InstaSection">
    <div class="flex flex-col md:flex-row md:justify-center">
      <div class="flex flex-col w-full md:w-1/2 p-4">
        <div class="text-center mb-4 text-yellow-300 text-lg font-semibold Artists">Buldenej</div>
        <div class="grid space-y-1 gap-4">
          <InstagramPost v-for="post in column1" :key="post.id" :msg="post.url" />
        </div>
      </div>
      <div class="flex flex-col w-full md:w-1/2 p-4 md:ml-5">
        <div class="text-center mb-4 text-yellow-300 text-lg font-semibold Artists">Sigarme</div>
        <div class="grid space-y-1 gap-4">
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
    width: 90%; /* Allow some margin on smaller screens */
  }
}
</style>

<script>
import InstagramPost from './InstagramPost.vue'

export default {
  components: {
    InstagramPost
  },
  data() {
    return {
      column1: [
        {
          id: 1,
          url: 'https://www.instagram.com/p/C63_qWus8tp/?utm_source=ig_embed&amp;utm_campaign=loading'
        },
        {
          id: 2,
          url: 'https://www.instagram.com/p/C63_qWus8tp/?utm_source=ig_embed&amp;utm_campaign=loading'
        },
        {
          id: 3,
          url: 'https://www.instagram.com/p/C63_qWus8tp/?utm_source=ig_embed&amp;utm_campaign=loading'
        }
      ],
      column2: [
        {
          id: 4,
          url: 'https://www.instagram.com/p/C63_qWus8tp/?utm_source=ig_embed&amp;utm_campaign=loading'
        },
        {
          id: 5,
          url: 'https://www.instagram.com/p/C63_qWus8tp/?utm_source=ig_embed&amp;utm_campaign=loading'
        },
        {
          id: 6,
          url: 'https://www.instagram.com/p/C63_qWus8tp/?utm_source=ig_embed&amp;utm_campaign=loading'
        }
      ]
    }
  }
}
</script>
