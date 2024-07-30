<template>
  <div id="container" class="relative flex items-center justify-center">
    <div class="top-left"></div>
    <div class="top-right"></div>
    <div class="bottom-left"></div>
    <div class="bottom-right"></div>
    <div class="gallery">
      <img src="../assets/images/Buldenej.png" alt="Buldenej" />
      <div class="separator"></div>
      <img src="../assets/images/Sigarme.png" alt="Sigarme" />
    </div>
  </div>
</template>

<style scoped>
#container {
  margin-top: 250px;
  backdrop-filter: blur(16px);
  width: 928px;
  height: 395px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery {
  --s: 98px; /* Control the slanted part */
  border-radius: 16px;
  display: flex;
  height: 100%; /* The height of the images */
  gap: 0px; /* Control the gap */
}
.gallery > img {
  flex: 1;
  min-width: 0;
  object-fit: cover;
  cursor: pointer;
  transition: 0.5s;
}
.gallery > img:hover {
  flex: 1.8;
}
.gallery > img:first-child {
  margin-right: calc(-0.5 * var(--s));
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--s)) 100%, 0 100%);
}
.gallery > img:last-child {
  margin-left: calc(-0.5 * var(--s));
  clip-path: polygon(var(--s) 0, 100% 0, 100% 100%, 0 100%);
}

.top-left,
.top-right,
.bottom-left,
.bottom-right {
  position: absolute;
  pointer-events: none;
  z-index: 1; /* Ensure the elements are above other content */
}

.top-left {
  top: -6px; /* Adjusted to push the border out more */
  left: -6px; /* Adjusted to push the border out more */
  width: calc(50% + 6px); /* Adjusted to maintain the correct size */
  height: calc(50% + 6px); /* Adjusted to maintain the correct size */
  border-top: 6px solid transparent; /* Increased border width */
  border-left: 6px solid transparent; /* Increased border width */
  background:
    linear-gradient(to right, rgba(228, 186, 30, 1), rgba(228, 186, 30, 0)) 0 0,
    linear-gradient(to bottom, rgba(228, 186, 30, 1), rgba(228, 186, 30, 0)) 0 0;
  background-size:
    100% 6px,
    6px 100%; /* Adjusted to match the new border width */
  background-repeat: no-repeat;
}

.bottom-right {
  bottom: -6px; /* Adjusted to push the border out more */
  right: -6px; /* Adjusted to push the border out more */
  width: calc(50% + 6px); /* Adjusted to maintain the correct size */
  height: calc(50% + 6px); /* Adjusted to maintain the correct size */
  border-bottom: 6px solid transparent; /* Increased border width */
  border-right: 6px solid transparent; /* Increased border width */
  background:
    linear-gradient(to left, rgba(228, 186, 30, 1), rgba(228, 186, 30, 0)) 100% 100%,
    linear-gradient(to top, rgba(228, 186, 30, 1), rgba(228, 186, 30, 0)) 100% 100%;
  background-size:
    100% 6px,
    6px 100%; /* Adjusted to match the new border width */
  background-repeat: no-repeat;
}

.separator {
  bottom: 0;
  width: 3px;
  transform: rotate(13.86deg);
  background: linear-gradient(
    180deg,
    rgba(228, 186, 30, 0) 0%,
    /* Start of gradient */ rgba(228, 186, 30, 0) 20%,
    /* Fading starts */ #e4ba1e 40%,
    /* Solid color */ #e4ba1e 60%,
    /* Solid color continues */ rgba(228, 186, 30, 0) 80%,
    /* Fading ends */ rgba(228, 186, 30, 0) 100% /* End of gradient */
  );
  z-index: 2;
  pointer-events: none; /* Allow interaction with images below */
}

/* Hide the unused elements */
.top-right,
.bottom-left {
  display: none;
}
</style>
