<template>
  <div>
    <div v-if="!isConfirmDeleteLayer && !isExtensionGalleryLayer" class="p-20 flex flex-col w-full">
      <h1 class="text-5xl font-bold">Kody</h1>
      <hr class="my-10 border-gray-700">
      <div class="flex flex-row flex-wrap">
        <router-link to="/add-gallery" class="panel-info hover:bg-gray-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Dodaj kod
        </router-link>
        <router-link to="/check-code" class="panel-info hover:bg-gray-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
          Sprawdź kod
        </router-link>
        <div class="panel-info">
          <span class="font-semibold text-4xl"> {{ this.codes.length }} </span>
          Ilość kodów
        </div>
      </div>
      <hr class="my-10 border-gray-700">
      <div class="flex flex-col">
        <h3 class="text-3xl font-semibold mb-6">Lista kodów</h3>
        <div v-if="this.codes.length === 0" class="flex w-full max-w-sm overflow-hidden bg-gray-700 rounded-lg shadow-md">
          <div class="flex items-center justify-center w-12 bg-blue-500">
            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"/>
            </svg>
          </div>
          <div class="px-4 py-2">
            <span class="font-semibold text-blue-400">Info</span>
            <p class="text-sm text-gray-200">Na ten moment nie posiadasz żadnych kodów.</p>
          </div>
        </div>
        <div class="flex flex-row flex-wrap">
          <div
            class="w-84 bg-gray-700 rounded shadow-md cursor-pointer p-2 mr-7 mb-10"
            v-for="code in codes"
            :key="code"
          >
            <router-link
              :to="{ name: 'Gallery', params: { code: code.code }}"
              class="flex flex-col justify-center items-center "
            >
              <span>{{ code.timeToDelete.slice(0, 10) }}</span>
              <span class="font-bold text-2xl text-blue-400">{{ code.code }}</span>
            </router-link>
            <div class="flex flex-row w-full justify-end items-center -mt-1">
              <button @click="toggleExtensionGalleryLayer(code.id, code.code)" class="hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <router-link :to="{ name: 'EditGallery', params: { code: code.code, description: code.description, imagesProp: code.images, codeId: code.id }}" class="hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </router-link>
              <button @click="toggleDeleteGalleryLayer(code.id, code.code)" class="hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ConfirmDeleteLayer
      v-else-if="isConfirmDeleteLayer "
      @delete-element="deleteGallery"
      @toggle-confirm-delete-layer="toggleDeleteGalleryLayer"
    />
    <ExtensionGalleryLayer
      :codeId="codeId"
      :codeCode="codeCode"
      v-else-if="isExtensionGalleryLayer"
      @set-time-to-delete="setTimeToDelete"
      @extension-gallery="extensionGallery"
      @toggle-extension-gallery-layer="toggleExtensionGalleryLayer"
    />
  </div>
</template>
<script>
import axios from 'axios'
import API_URL from '../API_URL'

import ConfirmDeleteLayer from '../components/ConfirmDeleteLayer.vue'
import ExtensionGalleryLayer from '../components/ExtensionGalleryLayer.vue'

export default {
  data() {
    return {
      codes: [],
      codeId: '',
      codeCode: '',
      timeToDelete: 604800000,
      isConfirmDeleteLayer: false,
      isExtensionGalleryLayer: false,
    }
  },
  props: {
    jwt: String
  },
  components: {
    ConfirmDeleteLayer,
    ExtensionGalleryLayer,
  },
  async created() {
    await axios.get(`${API_URL}/galleries`,
    { headers: { Authorization: `Bearer ${this.jwt}` } }
    ).then(response => {
      this.codes = response.data
    })
  },
  methods: {
    async deleteGallery() {
      await axios.delete(`${API_URL}/galleries/${this.codeId}`,
      { headers: { Authorization: `Bearer ${this.jwt}` } })
      .then(res => console.log(res))
      .catch(err => console.log(err));

      const index = this.codes.findIndex(el => el.id === this.codeId)
      this.codes.splice(index, 1)

      this.toggleDeleteGalleryLayer('')
    },
    async extensionGallery() {
      let gallery = {}

      await axios.get(`${API_URL}/galleries/${this.codeCode}`)
      .then(res => gallery = res.data)
      .catch(err => console.log(err))

      const newTimeToDelete = Date.parse(gallery.timeToDelete) + Number(this.timeToDelete);

      await axios.put(`${API_URL}/galleries/${this.codeId}`,
      { timeToDelete: newTimeToDelete },
      { headers: { Authorization: `Bearer ${this.jwt}` } })
      .then(res => {
        const index = this.codes.findIndex(el => el.id === this.codeId)
        this.codes[index].timeToDelete = res.data.timeToDelete
      })
      .catch(err => console.log(err));


      this.toggleExtensionGalleryLayer('')
    },
    toggleDeleteGalleryLayer(id, code){
      this.codeId = id;
      this.codeCode = code;
      this.isConfirmDeleteLayer = !this.isConfirmDeleteLayer;
    },
    toggleExtensionGalleryLayer(id, code){
      this.codeId = id;
      this.codeCode = code;
      this.isExtensionGalleryLayer = !this.isExtensionGalleryLayer;
    },
    setTimeToDelete(timeToDelete){
      this.timeToDelete = timeToDelete;
    },
  },
}
</script>