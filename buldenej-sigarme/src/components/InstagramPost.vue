<template>
  <div ref="postContainer" :id="uniqueId">
    <blockquote
      v-if="isLoaded"
      class="instagram-media"
      :data-instgrm-permalink="msg"
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
      <a :href="msg" target="_blank">Voir cette publication sur Instagram</a>
    </blockquote>
    <div v-else class="placeholder">Loading...</div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoaded: false,
      uniqueId: `instagram-post-${Math.random().toString(36).substr(2, 9)}`
    }
  },
  mounted() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadInstagramPost()
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(this.$refs.postContainer)
  },
  methods: {
    loadInstagramPost() {
      this.isLoaded = true
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.src = '//www.instagram.com/embed.js'
      document.head.appendChild(script)

      script.onload = () => {
        window.instgrm.Embeds.process()
      }

      this.$once('hook:beforeDestroy', () => {
        document.head.removeChild(script)
      })
    }
  }
}
</script>

<style scoped>
.instagram-post {
  /* Add any specific styles for the Instagram post here */
}

.placeholder {
  /* Add styles for the placeholder content */
  background: #f0f0f0;
  height: 400px; /* Adjust height as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}
</style>
