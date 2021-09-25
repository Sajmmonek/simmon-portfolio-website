<template>
  <div>
    <div v-if="!isDeletePortfolioImageLayer && !isPhotoLayerVisible" class="p-20 flex flex-col w-full">
      <h1 class="text-5xl font-bold">Portfolio</h1>
      <hr class="my-10 border-gray-700">
      <div class="flex flex-row flex-wrap">
        <router-link to="/add-portfolio-image" class="panel-info hover:bg-gray-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Dodaj zdjęcie
        </router-link>
        <div class="panel-info">
          <span class="font-semibold text-4xl"> {{ this.portfolioImages.length }} </span>
          Ilość zdjęć
        </div>
      </div>
      <hr class="mb-10 mt-3 border-gray-700">
      <div class="flex flex-col">
        <h3 class="text-3xl font-semibold mb-6">Lista zdjęć</h3>
        <div v-if="this.portfolioImages.length === 0" class="flex w-full max-w-sm overflow-hidden bg-gray-700 rounded-lg shadow-md">
          <div class="flex items-center justify-center w-12 bg-blue-500">
            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"/>
            </svg>
          </div>
          <div class="px-4 py-2">
            <span class="font-semibold text-blue-400">Info</span>
            <p class="text-sm text-gray-200">Na ten moment nie posiadasz żadnych zdjęć.</p>
          </div>
        </div>
        <div class="flex flex-row flex-wrap">
          <div
            class="bg-gray-700 rounded shadow-md mr-7 mb-10"
            v-show="portfolioImages.length !== 0"
            v-for="(image, index) in portfolioImages"
            :key="index"
          >
            <div class="flex flex-col w-full justify-end items-center">
              <button
                @click="toggleShowPhotoLayer(image.image)"
                class="w-72 h-72 bg-center bg-cover bg-no-repeat m-2 rounded shadow-md"
                :style="{ backgroundImage: 'url(' + image.image + ')' }"
              >
              </button>
              <div class="flex w-full justify-end">
                <router-link :to="{ name: 'EditPortfolioImage', params: { imageProp: image.image, description: image.description, portfolioId: image.id }}" class="hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </router-link>
                <button @click="toggleDeletePortfolioImageLayer(image.id)" class="hover:text-gray-300 mb-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PhotoLayer
      v-else-if="isPhotoLayerVisible"
      :imagePropString="this.imageToLayer"
      @toggle-show-photo-layer="toggleShowPhotoLayer"
    />
    <ConfirmDeleteLayer
      v-else-if="isDeletePortfolioImageLayer"
      @delete-element="deletePortfolioImage"
      @toggle-confirm-delete-layer="toggleDeletePortfolioImageLayer"
    />
  </div>
</template>
<script>
import axios from 'axios'
import API_URL from '../API_URL'

import ConfirmDeleteLayer from './ConfirmDeleteLayer.vue'
import PhotoLayer from './PhotoLayer.vue'

export default {
  data() {
    return {
      portfolioImages: [],
      portfolioImageId: '',
      isDeletePortfolioImageLayer: false,
      
      imageToLayer: '',
      isPhotoLayerVisible: false,
    }
  },
  props: {
    jwt: String,
  },
  components: {
    ConfirmDeleteLayer,
    PhotoLayer
  },
  async created() {
    await axios.get(`${API_URL}/portfolio-images`)
    .then(response => {
      this.portfolioImages = response.data
    })
  },
  methods: {
    async deletePortfolioImage() {
      await axios.delete(`${API_URL}/portfolio-images/${this.portfolioImageId}`,
      { headers: { Authorization: `Bearer ${this.jwt}` } })
      .then(res => console.log(res))
      .catch(err => console.log(err));

      const index = this.portfolioImages.findIndex(el => el.id === this.portfolioImageId)
      this.portfolioImages.splice(index, 1)

      this.toggleDeletePortfolioImageLayer('')

    },
    toggleDeletePortfolioImageLayer(id){
      console.log('dzik');
      this.isDeletePortfolioImageLayer = !this.isDeletePortfolioImageLayer
      this.portfolioImageId = id
    },
    toggleShowPhotoLayer(image) {
      this.isPhotoLayerVisible = !this.isPhotoLayerVisible
      this.imageToLayer = image
    }
  },
}
</script>