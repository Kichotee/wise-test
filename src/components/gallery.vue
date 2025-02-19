<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import type { Photo } from "../types";
import { useRouter } from "vue-router";

const { photos, loading } = defineProps<{
  photos: Photo[];
  loading?: boolean;
}>();

const imagesWithLoading = ref<Photo[]>([]);

const galleryLoading = computed(() => {
  console.log(imagesWithLoading.value);
  return loading || imagesWithLoading.value.some((img) => img.loading);
});

watchEffect(() => {
  imagesWithLoading.value = photos.map((photo) => ({
    ...photo,
    loading: true,
    loaded: false,
  }));
  console.log(imagesWithLoading.value);
});

const allImagesLoaded = ref(false);

const imageLoaded = (image: Photo) => {
  console.log(image);
  image.loading = false;
  image.loaded = true;
  allImagesLoaded.value = photos.every((img) => img.loaded);
};
const router = useRouter();
// const route = useRoute();

function openModalId(id: string) {
  router.replace({ hash: `#${id}` });
  console.log(router.currentRoute.value);
}
</script>

<template>
  <div>
    <div class="gallery">
      <div v-for="item in imagesWithLoading" :key="item.id" class="image-box">
        <div
          class=""
          @click="
            () => {
              openModalId(item.id);
            }
          "
        >
          <div :class="galleryLoading && 'loading-card'">
            <img :src="item.urls.small" alt="" @load="imageLoaded(item)" />
          </div>
          <div class="img-meta">
            <h3>{{ item.user.name }}</h3>
            <p>{{ item.alt_description }}</p>
          </div>
        </div>
        <Teleport to="body">
          <Transition name="modal">
            <div
              v-if="$route.hash == `#${item.id}`"
              class="modal"
              @click="() => router.replace({ hash: '' })"
            >
              <div class="modal-image-box">
                <img :src="item.urls.regular" alt="" />
                <div class="meta">
                  <h3>
                    {{ item?.user.name }}
                  </h3>
                  <p>
                    {{ item?.alt_description }}
                  </p>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/css/variables";
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 300px);
  padding-inline: 24px;
  translate: 0 -60px;
  row-gap: 28px;
  column-gap: 64px;
  width: 70vw;
  margin: auto;

  @media screen and (max-width: 1240px) {
    grid-template-columns: repeat(2, 300px);
    & .image-box {
      & img {
        height: 40vh;
      }
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 60vw);
  }

  & .image-box {
    width: 100%;
    height: max-content;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    & .loading-card {
      border-radius: 10px;
      width: 100%;
      min-height: 20vh;
      background-color: #eaf0f2;
    }
    & .imagecontent-box {
      display: none;
    }
    & img {
      position: relative;
      z-index: 10;
      width: 100%;
      border-radius: 10px;
      cursor: pointer;

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
        & ::first-letter {
          text-transform: uppercase;
        }
      }
      & p {
        margin: 0;
        font-size: 0.85rem;
        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
  }
}
.modal {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  translate: -50% -50%;
  left: 50%;
  background: #00000060;
  transition: opacity 0.3s ease;
  & .modal-image-box {
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 60vw;
    @media screen and (max-width:768px) {
      
      width:  80vw;
    }
    
    & img {
      height: 60vh;
      object-fit: cover;
    }
    & .meta {
      padding: 16px 24px;
      background-color: white;
      color: #1a1a1a;
      display: flex;
      flex-direction: column;
  
      &::first-letter {
        text-transform: uppercase;
      }
    }
    & h3 {
      color: variables.$primary-color;
    }
    & p {
      font-size: 0.875rem;
      line-height: 1.125rem;
      color: variables.$gray;
    }
  }
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
