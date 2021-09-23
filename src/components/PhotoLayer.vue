<template>
  <div class="h-screen w-full flex items-center justify-center">
    <div class="container max-w-4xl h-auto p-10 bg-gray-700 rounded-md shadow-md flex flex-col justify-center text-2xl text-blue-400">
      <button class="flex w-full justify-end" @click="this.$emit('toggle-show-photo-layer')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      <img class="my-5 rounded-md shadow-md w-auto max-h-136" :src="image.image" alt="Image">
      <p v-if="this.image.description">Opis zdjęcia: <span class="text-white">{{ image.description }}</span></p>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: {},
    }
  },
  props: {
    imageProp: Object,
  },
  created() {
    this.image = this.imageProp

    if(!this.imageProp.image) {
      this.image.image = this.imageProp.url
      this.image.image = this.imageProp.url
    }
  },
}
</script>