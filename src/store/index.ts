import { defineStore } from "pinia";
import type { Photo } from "../types";
import { computed, ref } from "vue";
import axios from "axios";

export const useGalleryStore = defineStore("gallery", () => {
  const images = ref<Photo[]>([]);

  async function getImages() {
    const response = await axios.get<{ results: Photo[] }>(
      `https://api.unsplash.com/photos/?client_id=${
        import.meta.env.VITE_UNSPLASH_ACCESS_KEY
      }`
    );
    images.value = response.data.results;
  }
  async function searchImages(query: string) {
    const response = await axios.get<{ results: Photo[] }>(
      `https://api.unsplash.com/search/photos/?page=1&query=${query}&client_id=${
        import.meta.env.VITE_UNSPLASH_ACCESS_KEY
      }`
    );
    images.value = response.data.results;
  }
  return {images, getImages, searchImages};
});
