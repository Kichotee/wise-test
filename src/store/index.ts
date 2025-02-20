import { defineStore } from "pinia";
import type { Photo } from "../types";
import axios from "axios";
import { ref } from "vue";

export const useGalleryStore = defineStore("gallery", () => {
  const images = ref<Photo[]>([]);
  const loading = ref(false);
  const isSearch = ref(false);

  async function getImages() {
    try {
      loading.value = true;
      const response = await axios.get<Photo[]>(
        `https://api.unsplash.com/photos/?client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }`
      );

      images.value = response.data.map((photo) => ({
        ...photo,
        loading: true,
        loaded: false,
      }));
    } catch (error) {
     
    } finally {
      loading.value = false;
    }
  }
  async function searchImages(query: string) {
    loading.value = true;
    try {
      isSearch.value = true;
      const response = await axios.get<{ results: Photo[] }>(
        `https://api.unsplash.com/search/photos/?page=1&query=${query}&client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }`
      );
      images.value = response.data.results.map((photo) => ({
        ...photo,
        loading: true,
        loaded: false,
      }));
   
    } catch (error) {
    } finally {
      loading.value = false;
    }
  }
  function closeSearch() {
    isSearch.value = false;
  }
  return { images, getImages, searchImages, loading, isSearch, closeSearch };
});
