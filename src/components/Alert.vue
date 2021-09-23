<template lang="">
  <div class="flex w-11/12 md:w-full max-w-sm overflow-hidden bg-gray-700 rounded-lg shadow-md fixed bottom-20 left-1/2 transform -translate-x-1/2 ">
    <div class="flex items-center justify-center w-12 bg-blue-500">
      <svg class="w-6 h-6 text-gray-200 fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"/>
      </svg>
    </div>
    <div class="px-4 py-2 -mx-3">
      <div class="mx-3">
        <span class="font-semibold text-blue-400">{{ $t("alert.attention") }}</span>
        <p class="text-sm text-gray-200">{{ this.alertText }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    alertText: String
  }
}
</script>