<template>
  <div>
    <Navbar />
    <div class="w-full h-screen flex justify-center items-center">
      <div class="container max-w-4xl h-112 bg-gray-700 rounded-md shadow-md p-7 text-xl">
        <h1 class="text-3xl font-bold text-center mb-10">Impressum</h1>
        <h2 class="text-2xl font-bold">{{ $t("impressum.owner") }}</h2>
        <p class="text-blue-400">Szymon "Simmon" Żbikowski</p>
        <h2 class="text-2xl font-bold mt-5">{{ $t("impressum.contact") }}</h2>
        <p>Email: <a class="text-blue-400" href="mailto:kontakt@simmon.pl">kontakt@simmon.pl</a></p>
        <p>{{ $t("impressum.phone") }}: <a class="text-blue-400" href="tel:000000000">000 000 000</a></p>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>Navbar