<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGalleryStore } from "./store";
import {  useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const query = ref<string>("");
const { searchImages, getImages, closeSearch } = useGalleryStore();
const { loading, isSearch } = storeToRefs(useGalleryStore());
const router = useRouter();
function cancelSearch() {
  closeSearch();
  getImages();
  router.push({});
}
// const route = useRoute();
function searchPhotos() {
  router.push({ query: { q: query.value } });
  searchImages(query.value);
  console.log(loading, isSearch);
}
onMounted(() => {
  getImages();
});
</script>

<template>
  <div>
    <div class="page">
      <div class="header-container">
        <div class="header-content">
          <div v-if="!loading && !isSearch" class="input-container">
            <div class="input-box">
              <div class="search-icon">
                <img src="/search-normal.svg" alt="" />
              </div>
              <input
                @change="
                  () => {
                    router.push({ query: { q: query } });
                  }
                "
                type="text"
                placeholder="Search"
                v-model="query"
              />
            </div>
            <button @click="searchPhotos">Search</button>
          </div>

          <div class="searching-content" v-if="loading && isSearch">
            Searching
            <span class="query">for {{ query }}</span>
          </div>
          <div class="search-content" v-if="isSearch && !loading">
            Search Results for
            <span class="query">"{{ query }}"</span>
            <button
              @click="
                () => {
                  cancelSearch();
                  console.log(isSearch);
                }
              "
            >
              <span> X </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
@use "./assets/css/variables";

.page {
  position: relative;
  top: 0;
  color: black;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & .header-container {
    background-color: #eaf0f2;
    width: 100%;
    height: max-content;

    padding: 120px 0;
    & .header-content {
      width: 80%;
      margin: 0 auto;
      & .search-content {
        font-weight: 600;
        color: variables.$primary-color;
        display: flex;
        align-items: center;
        gap: 10px;

        font-size: 48px;
        & .query {
          color: #9ac0cd;
        }
        & button {
          background-color: variables.$primary-color;
          padding: 0.5rem 1rem;
          border-radius: 100%;
          font-size: 20px;
          height: max-content;
        }
      }
      & .searching-content {
        font-weight: 600;
        color: variables.$primary-color;
        display: flex;
        align-items: center;
        gap: 10px;

        font-size: 48px;
      }
    }
    & .input-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      & .input-box {
        background-color: white;

        border: none;
        height: min-content;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 54px;
        & .search-icon {
          position: relative;
          top: 50%;
          translate: 0 -50%;
          height: max-content;
          padding-left: 5px;
          width: max-content;
        }

        & input {
          border: none;
          color: #1a1a1a;
          // padding: 18px 12px;
          height: 100%;
          padding-left: 60px;
          outline: none;
          background-color: transparent;
          position: absolute;
          z-index: 20;
          top: 0;
          translate: 0 0%;
          width: 100%;
        }
      }
      & button {
        background-color: #1a1a1a;
        max-width: max-content;
        color: white;
        border: none;
        border-radius: 10px;
        padding: 12px 24px;
        font-size: 1rem;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background-color: #2a2a2a;
        }
      }
    }
  }
  & .img-container {
    display: grid;
    grid-template-columns: repeat(3, 300px);
    padding-inline: 24px;
    translate: 0 -30px;
    row-gap: 28px;
    column-gap: 64px;
    width: max-content;
    max-width: 70vw;
    margin: auto;

    // & .image-box {
    //   width: 100%;
    //   height: max-content;
    //   // border: solid;
    //   overflow: hidden;
    //   border-radius: 10px;
    //   position: relative;

    //   & img {
    //     position: relative;
    //     z-index: 10;
    //     width: 100%;
    //     border-radius: 10px;

    //     height: 100%;
    //     object-fit: cover;
    //   }
    //   & .img-meta {
    //     position: absolute;
    //     z-index: 50;
    //     color: white;
    //     bottom: 10%;
    //     padding-inline: 6px;
    //     text-shadow: 0.1px 0.1px 2px #1a1a1a;

    //     & h3 {
    //       font-size: 1.25rem;
    //       font-weight: 600;
    //       margin: 0;
    //     }
    //     & p {
    //       margin: 0;
    //       font-size: 0.85rem;
    //     }
    //   }
    // }
  }
}
</style>
