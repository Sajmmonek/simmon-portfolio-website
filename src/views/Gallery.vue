<template>
  <div>
    <Navbar />
    <div class="h-full max-w-4xl mt-32 mx-auto flex flex-col">
      <div class="w-4/5 mx-auto bg-gray-700 rounded shadow-md px-10 py-7">
        <h2 class="text-4xl">Kod: <span class="font-bold text-blue-400">{{ gallery.code }}</span></h2>
        <hr class="my-4 border-gray-600">
        <div class="text-xl md:text-2xl">
          <h3>Liczba zdjęć: <span class="font-bold text-blue-400"> {{ numberOfImages }} </span></h3>
          <h3>Opis: <span class="font-bold text-blue-400"> {{ gallery.description }} </span></h3>
          <h3>Data wygaśnięcia: <span class="font-bold text-blue-400"> {{ expirationDate }} </span></h3>
          <div class="flex justify-center md:justify-end mt-4">
            <button class="flex flex-row items-center bg-gray-600 p-3 rounded shadow-md hover:bg-gray-500" @click="downloadAllImages">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span class="text-lg" >Pobierz wszystkie zdjęcia</span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-center m-10">
        <div
          v-for="(image, index) in gallery.images"
          :key="index"
          class="bg-cover bg-no-repeat bg-center grid-cols-1 m-2 h-64 w-96
            flex flex-col relative"
          :style="{ backgroundImage: 'url(' + image + ')' }"
        >
          <a :href="image" class="bg-gray-700 p-2 rounded shadow-md absolute right-4 bottom-4 hover:bg-gray-600" @click.prevent="downloadSingleImage(image, index)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

import API_URL from '../API_URL'
import axios from 'axios'
import JSZip from 'jszip'
import { saveAs } from 'file-saver';

export default {
  data() {
    return {
      gallery: {},
      numberOfImages: 0,
      expirationDate: ''
    }
  },
  props: {
    code: String,
  },
  components: {
    Navbar,
    Footer,
  },
  async created() {
    if(this.code) {
      await axios.get(`${API_URL}/galleries/${this.code}`)
      .then(response => {
        this.gallery = response.data
        this.numberOfImages = this.gallery.images.length
        this.expirationDate = this.gallery.timeToDelete.slice(0,10)
      })
    } else {
      this.$router.push('/check-code')
    }
  },
  methods: {
    downloadSingleImage(url, index){
      axios.get(url, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'image/png, image/jpeg' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `image${index+1}`
          link.click()
          URL.revokeObjectURL(link.href)
        }).catch(console.error)
    },
    async downloadAllImages(){
      var zip = new JSZip()

      this.gallery.images.forEach(async (image, index) => {
        await axios.get(image, { responseType: 'blob' })
        .then(response => {
          const indexOfDot = image.lastIndexOf('.')
          const typeOfImage = image.slice(indexOfDot, image.length);

          const blob = new Blob([response.data], { type: 'image/png, image/jpeg' })

          zip.file(`image${index+1}.${typeOfImage}`, blob)

          if(this.gallery.images.length === index + 1) {
            zip.generateAsync({
              type: "blob"
            }).then(function(content) {
              saveAs(content, "images.zip")
            })
          }
        }).catch(console.error)
      })
    },
  }
}
</script>