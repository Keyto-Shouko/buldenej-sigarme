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
    ConventionsManager
  },
  setup() {
    // (Keep all existing code for handling the background and Instagram posts)
    const bgColor1 = ref('#ffffff');
    const bgColor2 = ref('#ffffff');
    const buldenejInstagramPosts = ref([
      { id: 1, url: '' },
      { id: 2, url: '' },
      { id: 3, url: '' }
    ]);
    const sigarmeInstagramPosts = ref([
      { id: 1, url: '' },
      { id: 2, url: '' },
      { id: 3, url: '' }
    ]);

    const gradientStyle = computed(() => `linear-gradient(${bgColor1.value}, ${bgColor2.value})`);

    const fetchInstagramPosts = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('buldenejPost1, buldenejPost2, buldenejPost3, sigarmePost1, sigarmePost2, sigarmePost3')
        .eq('id', 1);

      if (error) {
        console.error('Error fetching Instagram posts:', error);
        return;
      }

      if (data && data.length > 0) {
        const row = data[0];
        buldenejInstagramPosts.value = [
          { id: 1, url: row.buldenejPost1 },
          { id: 2, url: row.buldenejPost2 },
          { id: 3, url: row.buldenejPost3 }
        ];
        sigarmeInstagramPosts.value = [
          { id: 1, url: row.sigarmePost1 },
          { id: 2, url: row.sigarmePost2 },
          { id: 3, url: row.sigarmePost3 }
        ];
      }
    };

    const updateInstagramPosts = async () => {
      const { error } = await supabase
        .from('settings')
        .update({
          buldenejPost1: buldenejInstagramPosts.value[0].url,
          buldenejPost2: buldenejInstagramPosts.value[1].url,
          buldenejPost3: buldenejInstagramPosts.value[2].url,
          sigarmePost1: sigarmeInstagramPosts.value[0].url,
          sigarmePost2: sigarmeInstagramPosts.value[1].url,
          sigarmePost3: sigarmeInstagramPosts.value[2].url
        })
        .eq('id', 1);

      if (error) {
        console.error('Error updating Instagram posts:', error);
        return;
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
      await updateInstagramPosts();
      await fetchInstagramPosts(); // Refresh Instagram posts after saving
    };

    const restoreInstagramDefaults = async () => {
      const { data, error } = await supabase
        .from('originalSettings')
        .select('buldenejPost1, buldenejPost2, buldenejPost3, sigarmePost1, sigarmePost2, sigarmePost3')
        .eq('id', 1);

      if (error) {
        console.error('Error restoring default Instagram posts:', error);
        return;
      }

      if (data && data.length > 0) {
        const row = data[0];
        buldenejInstagramPosts.value = [
          { id: 1, url: row.buldenejPost1 },
          { id: 2, url: row.buldenejPost2 },
          { id: 3, url: row.buldenejPost3 }
        ];
        sigarmeInstagramPosts.value = [
          { id: 1, url: row.sigarmePost1 },
          { id: 2, url: row.sigarmePost2 },
          { id: 3, url: row.sigarmePost3 }
        ];
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
      restoreDefaults
    };
  }
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
