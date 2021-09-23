<template>
  <div>
    <Navbar />
    <div>
      <div class="w-full h-screen flex justify-center items-center">
        <div class="w-full max-w-sm m-10 sm:m-0 overflow-hidden bg-gray-700 py-10 rounded-lg shadow-md">
          <div class="px-6 py-4">
            <h2 class="text-3xl font-bold text-center mb-3 text-white">{{ $t("to-download.to-download") }}</h2>
            <p class="mt-1 text-center text-gray-300">{{ $t("to-download.sub-text") }}</p>
            <form @submit.prevent="checkCode()">
              <div class="w-full mt-4">
                <input
                  class="block w-full px-4 py-2 mt-2 text-gray-100 placeholder-gray-500 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring"
                  v-model="codeValue"
                  type="text"
                  :placeholder="$t('to-download.access-code')"
                  :aria-label="$t('to-download.access-code')"
                  required
                >
              </div>
              <div class="flex items-center mt-5">
                <input
                  class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded cursor-pointer hover:bg-gray-900 focus:outline-none"
                  type="submit"
                  :value="$t('to-download.search')"
                >
              </div>
              <Alert 
                v-if="this.codeError" 
                :alertText="$t('alert.check-code')" 
              />
            </form>
          </div>
        </div>
        <div class="w-136 ml-32 hidden xl:block">
          <img class="w-full" src="../assets/svg/authentication.svg">
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue';
import Alert from '../components/Alert.vue';
import Footer from '../components/Footer.vue';

import API_URL from '../API_URL'
import axios from 'axios'

export default {
  data() {
    return {
      codeValue: '',

      codeError: false,
      setTimeout: Function,
      setTimeoutTime: 4000,

      gallery: {}
    }
  },
  components: {
    Navbar,
    Alert,
    Footer
  },
  methods: {
    async checkCode() {
      await axios.get(`${API_URL}/galleries/${this.codeValue}`)
      .then(res => {
        this.gallery = res.data
        this.$router.push({name: "Gallery", params: {code: this.codeValue}})
      })
      .catch(() => {
        this.setTimeout = setTimeout(() =>{
          this.codeError = false
        },this.setTimeoutTime)
        return this.codeError = true
      })
    },
  },
}
</script>