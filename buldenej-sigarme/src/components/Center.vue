<template>
  <div id="container" class="relative flex items-center justify-center">
    <div class="gallery">
      <div class="img-container">
        <img src="../assets/images/Buldenej.png" alt="Buldenej" />
      </div>
      <div class="img-container">
        <img src="../assets/images/Sigarme.png" alt="Sigarme" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  margin-top: 250px;
  backdrop-filter: blur(16px);
  width: 928px;
  height: 395px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery {
  --s: 98px; /* Control the slanted part */
  display: flex;
  height: 100%; /* The height of the images */
  width: 100%;
}

.img-container {
  position: relative;
  flex: 1;
  overflow: hidden;
  transition: flex 0.5s ease;
}

.img-container img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.img-container:hover {
  flex: 1.8;
}

.img-container:first-child {
  margin-right: calc(-0.5 * var(--s));
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--s)) 100%, 0 100%);
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border: 3px solid transparent;
  background: linear-gradient(
    135deg,
    rgba(228, 186, 30, 1),
    rgba(228, 186, 30, 1) 26%,
    rgba(0, 0, 0, 0.2) 26%,
    rgba(0, 0, 0, 0.2) 74%
  );
  background-origin: border-box;
  background-clip: border-box;
  mask-image:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
}

.img-container:first-child::after {
  content: '';
  position: absolute;
  top: 0;
  right: 46px; /* Adjust to fit the design */
  width: 3px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(228, 186, 30, 0) 0%,
    /* Fully transparent at the top */ rgba(228, 186, 30, 0.5) 20%,
    /* Fades in a bit */ rgba(228, 186, 30, 1) 50%,
    /* Full gold color in the center */ rgba(228, 186, 30, 0.5) 80%,
    /* Fades out again */ rgba(228, 186, 30, 0) 100% /* Fully transparent at the bottom */
  );
  transform: rotate(13.86deg); /* Applying rotation */
  z-index: 1; /* Ensure it appears above the background but below other content */
}

.img-container:last-child {
  margin-left: calc(-0.5 * var(--s));
  clip-path: polygon(var(--s) 0, 100% 0, 100% 100%, 0 100%);
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  border: 3px solid transparent;
  background: linear-gradient(
    -45deg,
    rgba(228, 186, 30, 1),
    rgba(228, 186, 30, 1) 26%,
    rgba(0, 0, 0, 0.2) 26%,
    rgba(0, 0, 0, 0.2) 74%
  );
  background-origin: border-box;
  background-clip: border-box;
  mask-image:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
}
</style>
