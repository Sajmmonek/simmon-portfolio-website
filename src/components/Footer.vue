<template>
  <footer class="bg-gray-700">
    <div class="container px-6 py-8 mx-auto">
      <img class="w-32 -my-5" src="../assets/logo.png" alt="Simmon logo">
      <hr class="my-8 border-gray-600">
      <RouterLinks :className="'footer'" />
      <hr class="my-8 border-gray-600">
      <div class="sm:flex sm:items-center sm:justify-between">
        <router-link to="/impressum" class="text-sm text-gray-300">© Copyright 2021. All Rights Reserved.</router-link>
        <SocialMediaIcons />
      </div>
    </div>
  </footer>
</template>
<script>
import RouterLinks from './RouterLinks.vue'
import SocialMediaIcons from './SocialMediaIcons.vue'

export default {
  data() {
    return {
      navLinks: [
        { to: '/', text: "Strona główna", id: "home" },
        { to: '/portfolio', text: "Portfolio", id: "portfolio" },
        { to: '/about', text: "O mnie", id: "about" },
        { to: '/download', text: "Do pobrania", id: "download" },
        { to: '/contact', text: "Kontakt", id: "contact" },
      ],
    }
  },
  components: { 
    SocialMediaIcons,
    RouterLinks
  },
}
</script>