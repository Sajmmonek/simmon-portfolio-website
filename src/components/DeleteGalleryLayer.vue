<template>
  <div class="deleteOrEditLayer">
    <div class=" w-4/5 h-4/5 flex flex-col justify-center items-center" >
      <h1 class="text-4xl font-bold">
        Czy na pewno chcesz usunąć kod <span class="font-bold text-blue-400">{{ this.codeCode }}</span>?
      </h1>
      <div class="mt-10">
        <button
          class="bg-blue-500 text-white text-3xl p-4 w-40 rounded-xl"
          @click="deleteGallery"
        >
          Tak
        </button>
        <button
          class="bg-gray-700 text-blue-400 text-3xl p-4 w-40 ml-10 rounded-xl"
          @click="toggleDeleteGalleryLayer"
        >
          Nie
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    codeId: String,
    codeCode: String,
  },
  methods: {
    deleteGallery(){
      this.$emit('delete-gallery')
    },
    toggleDeleteGalleryLayer(){
      this.$emit('toggle-delete-gallery-layer')
    }
  }
}
</script>