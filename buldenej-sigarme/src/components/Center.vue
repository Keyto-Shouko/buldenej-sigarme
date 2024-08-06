<template>
  <div id="container" class="relative flex items-center justify-center">
    <div class="gallery">
      <div class="img-container">
        <img src="../assets/images/Buldenej.png" alt="Buldenej" />
        <div class="overlay-text">Buldenej</div>
        <div class="sub-overlay-text">Illustratrice 2D</div>
      </div>
      <div class="img-container">
        <img src="../assets/images/Sigarme.png" alt="Sigarme" />
        <div class="overlay-text-right">Sigarme</div>
        <div class="sub-overlay-text-right">Modeleur 3D</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  margin-top: 150px;
  backdrop-filter: blur(16px);
  width: 88%;
  max-width: 928px;
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
  flex-direction: row;
}

.img-container {
  position: relative;
  flex: 1;
  overflow: hidden;
  transition: flex 0.5s ease;
}

.img-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30%; /* Adjust the height as needed */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  z-index: 1; /* Ensure it appears above the image but below the text */
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

.overlay-text {
  position: absolute;
  top: 24px; /* Adjust as needed */
  left: 32px; /* Adjust as needed */
  color: rgba(197, 166, 67, 1);
  font-size: 44px; /* Adjust as needed */
  padding: 5px; /* Optional: padding for better readability */
  border-radius: 5px; /* Optional: rounded corners */
  font-family: 'MedievalSharp', sans-serif;
  z-index: 2; /* Ensure it stays above the image */
}

.sub-overlay-text {
  position: absolute;
  top: 100px; /* Adjust as needed */
  left: 40px; /* Adjust as needed */
  color: white;
  font-size: 16px; /* Adjust as needed */
  background-color: rgba(15, 15, 15, 0.48); /* Background for better readability */
  padding: 5px; /* Padding for better readability */
  border: 2px solid rgba(197, 166, 67, 1); /* Border box */
  border-radius: 8px; /* Rounded corners */
  line-height: 24px;
}

.overlay-text-right {
  position: absolute;
  top: 24px; /* Adjust as needed */
  right: 32px; /* Adjust as needed */
  color: rgba(197, 166, 67, 1);
  font-size: 44px; /* Adjust as needed */
  padding: 5px; /* Optional: padding for better readability */
  border-radius: 5px; /* Optional: rounded corners */
  font-family: 'MedievalSharp', sans-serif;
  z-index: 2; /* Ensure it stays above the image */
}

.sub-overlay-text-right {
  position: absolute;
  top: 100px; /* Adjust as needed */
  right: 40px; /* Adjust as needed */
  color: white;
  font-size: 16px; /* Adjust as needed */
  background-color: rgba(15, 15, 15, 0.48); /* Background for better readability */
  padding: 5px; /* Padding for better readability */
  border: 2px solid rgba(197, 166, 67, 1); /* Border box */
  border-radius: 8px; /* Rounded corners */
  line-height: 24px;
  z-index: 2; /* Ensure it stays above the image */
}

/* Responsive Styles */
@media (max-width: 768px) {
  #container {
    margin-top: 100px; /* Adjust as needed */
    height: auto;
  }

  .gallery {
    flex-direction: column;
  }

  .img-container {
    flex: none;
    margin: 0 0 20px 0; /* Add vertical spacing between images */
    clip-path: none;
    border-radius: 0;
    border: none;
  }

  .img-container:first-child {
    clip-path: none;
    border: none;
    border-radius: 0px;
  }

  .img-container:last-child {
    clip-path: none;
    border: none;
    border-radius: 0px;
  }

  .img-container::after {
    display: none;
  }

  .img-container img {
    height: auto;
  }

  .img-container:hover {
    flex: none;
  }

  .img-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%; /* Adjust the height as needed */
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
    z-index: 1; /* Ensure it appears above the image but below the text */
  }

  .overlay-text,
  .sub-overlay-text {
    left: 45%;
    transform: translateX(-50%);
    text-align: center;
  }

  .overlay-text-right {
    right: 20%;
  }

  .sub-overlay-text-right {
    right: 30%;
  }
}
</style>
