<template>
  <div>
    <h1 class="sections mb-4">Background Section</h1>
    <!-- Background Section -->
    <div class="color-inputs">
      <label for="bgColor1">Background Color 1:</label>
      <input type="color" v-model="bgColor1" />

      <label for="bgColor2">Background Color 2:</label>
      <input type="color" v-model="bgColor2" />
    </div>

    <div class="buttons">
      <button @click="updateBgColor">Save</button>
      <button @click="restoreDefaults">Restore to Default</button>
    </div>

    <div class="gradient-preview" :style="{ background: gradientStyle }"></div>

    <!-- Buldenej Instagram Post Links Section -->
    <h1 class="sections">Buldenej Instagram Posts Section</h1>
    <div v-for="post in buldenejInstagramPosts" :key="post.id" class="instagram-post-editor">
      <label :for="'instagramUrl' + post.id">Instagram Post {{ post.id }} URL : </label>
      <input
        :id="'instagramUrl' + post.id"
        type="text"
        v-model="post.url"
        @input="handleUrlChange(post.id, $event, 'buldenej')"
      />
      <InstagramPost :msg="post.url" :key="post.url" />
    </div>
    <div class="buttons">
      <button @click="saveChanges">Save</button>
      <button @click="restoreInstagramDefaults">Restore to Default</button>
    </div>

    <!-- Sigarme Instagram Post Links Section -->
    <h1 class="sections">Sigarme Instagram Posts Section</h1>
    <div v-for="post in sigarmeInstagramPosts" :key="post.id" class="instagram-post-editor">
      <label :for="'instagramUrl' + post.id">Instagram Post {{ post.id }} URL : </label>
      <input
        :id="'instagramUrl' + post.id"
        type="text"
        v-model="post.url"
        @input="handleUrlChange(post.id, $event, 'sigarme')"
      />
      <InstagramPost :msg="post.url" :key="post.url" />
    </div>
    <div class="buttons">
      <button @click="saveChanges">Save</button>
      <button @click="restoreInstagramDefaults">Restore to Default</button>
    </div>

    <!-- Conventions Management Section -->
    <ConventionsManager />
  </div>
</template>

<script>
import ConventionsManager from '../components/ConventionsManager.vue';
import { ref, computed, onMounted } from 'vue';
import InstagramPost from '../components/InstagramPost.vue';
import { supabase } from '../supabase';

export default {
  components: {
    InstagramPost,
    ConventionsManager,
  },
  setup() {
    const bgColor1 = ref('#ffffff');
    const bgColor2 = ref('#ffffff');
    const buldenejInstagramPosts = ref([]);
    const sigarmeInstagramPosts = ref([]);

    const gradientStyle = computed(() => `linear-gradient(${bgColor1.value}, ${bgColor2.value})`);

    const fetchInstagramPosts = async () => {
      try {
        const { data: buldenejData, error: buldenejError } = await supabase
          .from('buldenejInsta')
          .select('id, url')
          .order('id', { ascending: true });

        if (buldenejError) {
          console.error('Error fetching Buldenej Instagram posts:', buldenejError);
          return;
        }

        const { data: sigarmeData, error: sigarmeError } = await supabase
          .from('sigarmeInsta')
          .select('id, url')
          .order('id', { ascending: true });

        if (sigarmeError) {
          console.error('Error fetching Sigarme Instagram posts:', sigarmeError);
          return;
        }

        buldenejInstagramPosts.value = buldenejData || [];
        sigarmeInstagramPosts.value = sigarmeData || [];
      } catch (error) {
        console.error('Unexpected error fetching Instagram posts:', error);
      }
    };

    const updateInstagramPosts = async () => {
      try {
        const buldenejUpdates = buldenejInstagramPosts.value.map(post =>
          supabase.from('buldenejInsta').update({ url: post.url }).eq('id', post.id)
        );

        const sigarmeUpdates = sigarmeInstagramPosts.value.map(post =>
          supabase.from('sigarmeInsta').update({ url: post.url }).eq('id', post.id)
        );

        await Promise.all([...buldenejUpdates, ...sigarmeUpdates]);
      } catch (error) {
        console.error('Error updating Instagram posts:', error);
      }
    };

    const handleUrlChange = (id, event, section) => {
      const newUrl = event.target.value;
      if (section === 'buldenej') {
        buldenejInstagramPosts.value = buldenejInstagramPosts.value.map(post =>
          post.id === id ? { ...post, url: newUrl } : post
        );
      } else if (section === 'sigarme') {
        sigarmeInstagramPosts.value = sigarmeInstagramPosts.value.map(post =>
          post.id === id ? { ...post, url: newUrl } : post
        );
      }
    };

    const saveChanges = async () => {
      try {
    // Try to update the Instagram posts
    await updateInstagramPosts();
    
    // Fetch Instagram posts again to refresh the data after saving
    await fetchInstagramPosts();

    // If everything went well, display a success message
    alert('Instagram posts saved successfully!');

  } catch (error) {
      // If an error occurred, display an error message
      console.error('Error saving Instagram posts:', error);
      alert('An error occurred while saving Instagram posts. Please try again later.');
  }
    };

    const restoreInstagramDefaults = async (section) => {
      const tableName = section === 'buldenej' ? 'buldenejInsta' : 'sigarmeInsta';
      const { data, error } = await supabase
        .from(tableName)
        .select('id, url')
        .eq('id', 1); // Adjust query as needed for restoring defaults

      if (error) {
        console.error(`Error restoring default Instagram posts for ${section}:`, error);
        alert('An error occurred while restoring default Instagram posts. Please try again later.');
        return;
      }

      if (section === 'buldenej') {
        buldenejInstagramPosts.value = data || [];
      } else {
        sigarmeInstagramPosts.value = data || [];
      }
    };

    const updateBgColor = async () => {
      await supabase
        .from('settings')
        .upsert({ id: 1, bgColor1: bgColor1.value, bgColor2: bgColor2.value });
      document.body.style.background = gradientStyle.value;
    };

    const restoreDefaults = async () => {
      const { data, error } = await supabase
        .from('originalSettings')
        .select('bgColor1, bgColor2')
        .eq('id', 1)
        .single();

      if (error) {
        console.error('Error fetching default settings:', error);
        alert('Une erreur est survenue lors de la restauration des paramètres par défaut. Veuillez réessayer ultérieurement.');
        return;
      }

      if (data) {
        bgColor1.value = data.bgColor1;
        bgColor2.value = data.bgColor2;
        document.body.style.background = gradientStyle.value;
      }
    };

    // Fetch initial data on component creation
    onMounted(async () => {
      const { data } = await supabase
        .from('settings')
        .select('bgColor1, bgColor2')
        .eq('id', 1)
        .single();
      if (data) {
        bgColor1.value = data.bgColor1;
        bgColor2.value = data.bgColor2;
        document.body.style.background = gradientStyle.value;
      }
      await fetchInstagramPosts();
    });

    return {
      bgColor1,
      bgColor2,
      buldenejInstagramPosts,
      sigarmeInstagramPosts,
      gradientStyle,
      saveChanges,
      restoreInstagramDefaults,
      handleUrlChange,
      updateBgColor,
      restoreDefaults,
    };
  },
};

</script>

<style scoped>
@font-face {
  font-family: 'MedievalSharp';
  src: url('../assets/fonts/MedievalSharp-Regular.ttf') format('truetype');
}

.sections {
  font-family: 'MedievalSharp', sans-serif;
  font-size: 24px;
  margin-top: 1.5rem;
  color: rgb(255, 255, 255);
}

label {
  font-family: 'MedievalSharp', sans-serif;
  font-size: 18px;
  color: rgb(255, 255, 255);
}

.color-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gradient-preview {
  width: 100%;
  height: 100px;
  margin-top: 20px;
  border: 3px solid white;
}

.buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 16px;
  border: solid 2px rgba(197, 166, 67, 1);
  color: rgb(255, 255, 255);
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: rgba(197, 166, 67, 0.8);
}

.instagram-post-editor {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
