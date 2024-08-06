<template>
  <div v-if="isVisible" class="scroll-to-top" @click="scrollToTop">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="w-6 h-6"
    >
      <path d="M19 15l-7-7-7 7" />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    checkScroll() {
      this.isVisible = window.scrollY > 300
    }
  },
  mounted() {
    window.addEventListener('scroll', this.checkScroll)
    this.checkScroll()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkScroll)
  }
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: opacity 0.3s;
}

.scroll-to-top:hover {
  background-color: #333;
}

.scroll-to-top svg {
  width: 24px;
  height: 24px;
}
</style>
