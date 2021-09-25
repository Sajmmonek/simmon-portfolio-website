<template>
  <div class="h-screen w-full bg-gray-800 top-0 left-0 absolute z-50 overflow-hidden">
    <div class="absolute top-0 left-0 flex w-full bg-gray-700 justify-between items-center text-2xl p-3">
      <div>
        <div v-if="image.description">
          {{ $t("gallery.description") }}: 
          <span class="text-blue-400">{{ image.description }}</span>
        </div>
      </div>
      <button class="ml-10" @click="this.$emit('toggle-show-photo-layer')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <img class="w-full p-5 mx-auto md:w-auto pt-40 md:p-20 mt-5 md:h-full" :src="image.image" alt="Image">
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
    imagePropObject: Object,
    imagePropString: String
  },
  created() {
    if(this.imagePropObject) {
      this.image = this.imagePropObject
    }

    if(this.imagePropString) {
      this.image.image = this.imagePropString
    }
  },
}
</script>