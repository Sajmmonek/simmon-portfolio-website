<template>
  <div>
    <Navbar />
    <div v-if="!isPhotoLayerVisible" class="container flex flex-col items-center mx-auto mt-32 mb-48">
      <div class="flex flex-row w-84 justify-between items-center border-b border-gray-600 shadow-md mb-5">
        <input 
          type="text"
          v-model="searchingQuery"
          class="text-2xl w-11/12 bg-transparent focus:outline-none p-1"
          :placeholder="$t('portfolio.search')"
          @keydown="checkKey($event)"
        >
        <button @click="searchPhotos" class="hover:bg-gray-700 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="flex flex-row flex-wrap justify-center max-w-7xl">
        <button
          v-show="imagesUrl.length !== 0"
          v-for="(imageUrl, index) in imagesUrl"
          :key="index"
          @click="toggleShowPhotoLayer(imageUrl)"
          class="w-72 h-72 bg-center bg-cover bg-no-repeat m-7 rounded shadow-md"
          :style="{ backgroundImage: 'url(' + imageUrl.image + ')' }"
        >
        </button>
        <div v-show="imagesUrl.length === 0" class="flex flex-col items-center justify-center mt-12">
          <img 
            class="w-1/2"
            src="../assets/svg/noImagesFound.svg" 
            alt="No images found"
          >
          <span class="text-2xl md:text-3xl mt-10 text-gray-300">{{ $t("portfolio.no-photos-found") }}</span>
        </div>
      </div>
    </div>
    <PhotoLayer
      v-else
      :imagePropObject="this.imageToLayer"
      @toggle-show-photo-layer="toggleShowPhotoLayer"
    />
    <Footer />
  </div>
</template>
<script>
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.vue';
import PhotoLayer from '../components/PhotoLayer.vue';

import axios from 'axios';
import API_URL from '../API_URL'

export default {
  components: {
    Navbar,
    Footer,
    PhotoLayer
  },
  data(){
    return{
      searchingQuery: '',
      imagesUrl: [],
      imagesUrlCopy: [],

      imageToLayer: {},
      isPhotoLayerVisible: false
    }
  },
  async created(){
    await axios.get(`${API_URL}/portfolio-images`)
    .then(res => {
      this.imagesUrl = res.data
      this.imagesUrlCopy = res.data
    })
    .catch(err => console.log(err))
  },
  methods: {
    searchPhotos() {
      this.imagesUrl = this.imagesUrlCopy
      this.imagesUrl = this.imagesUrl.filter((image) => {
        let imageDescription = image.description.toLowerCase()
        let searchingQuery = this.searchingQuery.toLowerCase().split(' ')
        return searchingQuery.every(searchingWord => imageDescription.includes(searchingWord));
      })
    },
    checkKey(event) {
      if(event.key === "Enter") {
        this.searchPhotos()
      }
    },
    toggleShowPhotoLayer(image) {
      this.isPhotoLayerVisible = !this.isPhotoLayerVisible
      this.imageToLayer = image
    }
  },
}
</script>