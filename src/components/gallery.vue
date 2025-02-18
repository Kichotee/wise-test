<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import type { Photo } from "../types";

const { photos, loading } = defineProps<{
  photos: Photo[];
  loading?: boolean;
}>();

const imagesWithLoading = ref<Photo[]>([]);

// Use a computed property for the overall loading state
const galleryLoading = computed(() => {
  console.log(imagesWithLoading.value);
  return loading || imagesWithLoading.value.every(img => img.loading);
});

watchEffect(()=>{
  imagesWithLoading.value = photos.map(photo => ({ ...photo, loading: true, loaded: false }));
  console.log(imagesWithLoading.value)
})

const allImagesLoaded = ref(false);

const imageLoaded = (image: Photo) => {
  console.log(image)
  image.loading = false;
  image.loaded = true;
  allImagesLoaded.value = photos.every((img) => img.loaded);
};
</script>
<template>
  <div>
    <div class="gallery">
      <div v-for="item in photos || 6" :key="item.id" class="image-box">
        <!-- <div class="loading-card" v-if=" galleryLoading"></div> -->
        <div  :class="!galleryLoading ? 'imagecontent-box' : 'loading-card'">
          <img :src="item.urls.small" alt="" @load="imageLoaded(item)" />
        </div>
        <div class="img-meta">
          <h3>{{ item.user.name }}</h3>
          <p>{{ item.alt_description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 300px);
  padding-inline: 24px;
  translate: 0 -60px;
  row-gap: 28px;
  column-gap: 64px;
  width: max-content;
  max-width: 70vw;
  margin: auto;

  & .image-box {
    width: 100%;
    height: max-content;
    // border: solid;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    & .loading-card {
      border-radius: 10px;
      width: 100%;
      height: 30vh;
      background-color: #eaf0f2;
      
    }
    & .imagecontent-box{
      display:none;
    }
    & img {
      position: relative;
      z-index: 10;
      width: 100%;
      border-radius: 10px;

      height: 100%;
      object-fit: cover;
    }
    & .img-meta {
      position: absolute;
      z-index: 50;
      color: white;
      bottom: 10%;
      padding-inline: 6px;
      text-shadow: 0.1px 0.1px 2px #1a1a1a;

      & h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
      }
      & p {
        margin: 0;
        font-size: 0.85rem;
      }
    }
  }
}
</style>
