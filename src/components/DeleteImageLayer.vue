<template>
  <div class="deleteOrEditLayer">
    <div class=" w-4/5 h-4/5 flex flex-col justify-center items-center" >
      <h1 class="text-4xl font-bold">
        Czy na pewno chcesz usunąć zdjęcie ?
      </h1>
      <div class="mt-10">
        <button
          class="bg-blue-500 text-white text-3xl p-4 w-40 rounded-xl"
          @click="deleteImage"
        >
          Tak
        </button>
        <button
          class="bg-gray-700 text-blue-400 text-3xl p-4 w-40 ml-10 rounded-xl"
          @click="toggleDeleteImageLayer"
        >
          Nie
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deleteImage(){
      this.$emit('delete-image')
    },
    toggleDeleteImageLayer(){
      this.$emit('toggle-delete-image-layer')
    }
  }
}
</script>