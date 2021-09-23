<template>
  <div>
    <Navbar />

    <ContactComponent class="mt-20 2xl:mt-0" />

    <Footer />
  </div>
</template>
<script>
import Navbar from '../components/Navbar'
import ContactComponent from '../components/ContactComponent.vue'
import Footer from '../components/Footer.vue'

export default {
  components: {
    Navbar,
    ContactComponent,
    Footer,
  },
}
</script>