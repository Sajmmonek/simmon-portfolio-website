<template>
  <div class="panel-layer">
    <button class="absolute top-3 right-6" @click="toggleExtensionGalleryLayer">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <h1 class="text-4xl font-bold text-center">
      Wybierz, o ile chcesz przedłużyć kod <span class="font-bold text-blue-400">{{ this.codeCode }}</span>
    </h1>
    <select 
      @change="setTimeToDelete($event.target.value)" 
      ref="extensionSelect" 
      class="text-white text-2xl p-2 w-52 h-16 my-10 bg-gray-700 rounded-md"
    >
      <option
        v-for="timeOption in expirationOptions"
        :key="timeOption.asString"
        :value="timeOption.asNumber"
      >

        {{ timeOption.asString }}
      </option>
    </select>
    <div class="mt-10 flex flex-col md:flex-row text-3xl">
      <button
        class="bg-blue-500 text-white p-4 w-40 rounded-xl"
        @click="extensionGallery"
      >
        Zapisz
      </button>
      <button
        class="bg-gray-700 text-blue-400 p-4 w-40 rounded-xl mt-5 md:mt-0 md:ml-10"
        @click="toggleExtensionGalleryLayer"
      >
        Anuluj
      </button>
    </div>
  </div>
</template>

<script>

import expirationOptions  from  '../json_files/expirationOptions .json'

export default {
  data() {
    return {
      expirationOptions: expirationOptions,
      extensionValue: '',
    }
  },
  props: {
    codeId: String,
    codeCode: String
  },
  methods: {
    setTimeToDelete(timeToDelete){
      this.$emit('set-time-to-delete', timeToDelete)
    },
    extensionGallery(){
      this.extensionValue = this.$refs.extensionSelect.value
      this.$emit('extension-gallery')
    },
    toggleExtensionGalleryLayer(){
      this.$emit('toggle-extension-gallery-layer')
    }
  }
}
</script>