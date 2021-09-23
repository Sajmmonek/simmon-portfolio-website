<template>
  <div>
    <Navbar />
    
    <AboutComponent :aditionalClass="'my-12 2xl:my-20 lg:mt-32 2xl:mt-40'" />

    <Carousel class="mb-20" />

    <Footer />
  </div>
</template>
<script>
import Navbar from '../components/Navbar'
import AboutComponent from '../components/AboutComponent.vue'
import Carousel from '../components/Carousel.vue'
import Footer from '../components/Footer.vue'

export default {
  components: {
    Navbar,
    AboutComponent,
    Carousel,
    Footer,
  }
}
</script>