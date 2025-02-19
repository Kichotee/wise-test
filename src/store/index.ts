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
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
  async function searchImages(query: string) {
    try {
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
      loading.value = true;
      isSearch.value = true;
      console.log(loading.value, isSearch.value)
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
