<template>
  <div>
    <Navbar />
    <div class="w-full h-screen flex flex-col items-center justify-center">
      <img 
        class="w-1/3"
        src="../assets/svg/pageNotFound.svg" 
        alt="No page found graphic"
      >
      <span class="mt-10 font-bold text-4xl">{{ $t("pageNotFound") }} :(</span>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
export default {
  components: { 
    Navbar, 
    Footer 
  },
}
</script>