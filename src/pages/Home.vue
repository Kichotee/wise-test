<script setup lang="ts">
import { useGalleryStore } from "../store";
import Gallery from "../components/gallery.vue";
import { storeToRefs } from "pinia";
import Error from "../components/error.vue";



const { images } = storeToRefs(useGalleryStore());
</script>

<template>
  <div class="">
    <Gallery :photos="images" />
    <div class="" v-if="images.length == 0">
      <Error>
        We can't get images right now
      </Error>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  position: relative;
  top: 0;
  width: 100vw;
  min-height: 100vh;
  color: black;
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
        color: #455d65;
        font-size: 48px;
        & .query {
          color: #9ac0cd;
        }
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
}
.img-container {
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
