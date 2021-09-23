<template>
  <div class="container w-4/5 md:w-3/5 mx-auto">
    <section class="bg-transparent" :class="aditionalClass">
      <div class="py-8 mx-auto">
        <div class="items-center lg:flex">
          <div class="lg:w-1/2">
            <h2 class="text-3xl font-bold text-white">{{ $t("about-me.who-i-am") }}</h2>
            <p class="my-4 text-gray-100 text-lg lg:max-w-md">
              {{ $t("about-me.main-text") }}
            </p>
            <SocialMediaIcons />
          </div>
          <div class="mt-8 lg:mt-0 lg:w-1/2">
            <div class="flex items-center justify-center lg:justify-end">
              <div class="max-w-lg">
                <img class="object-cover object-center w-full h-64" src="../assets/avatar.png" alt="Avatar">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr class="w-1/2 mt-8 mb-16 mx-auto border-gray-600">
  </div>
</template>
<script>

import SocialMediaIcons from './SocialMediaIcons.vue'

export default {
  components: {
    SocialMediaIcons
  },
  props: {
    aditionalClass: String
  },
}
</script>