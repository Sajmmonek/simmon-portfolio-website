<template>
  <div>
    <Navbar />
    <div class="w-full h-screen flex justify-center items-center">
      <div class="w-full max-w-sm m-10 sm:m-0 overflow-hidden bg-gray-700 py-10 rounded-lg shadow-md">
        <div class="px-6 py-4">
          <h2 class="text-3xl font-bold text-center mb-3 text-white">{{ $t("login.main-text") }}</h2>
          <p class="mt-1 text-center text-gray-300">{{ $t("login.admin-panel") }}</p>
          <form @submit.prevent="login()">
            <div class="w-full mt-4">
              <input
                class="block w-full px-4 py-2 mt-2 text-gray-100 placeholder-gray-500 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring"
                v-model="emailValue"
                type="text"
                placeholder="Email"
                aria-label="Email"
                required
              >
            </div>
            <div class="w-full mt-4">
              <input
                class="block w-full px-4 py-2 mt-2 text-gray-100 placeholder-gray-500 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring"
                v-model="passwordValue"
                type="password"
                :placeholder="$t('login.password')"
                :aria-label="$t('login.password')"
                required
              >
            </div>
            <div class="flex items-center mt-4">
              <input
                class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded cursor-pointer hover:bg-gray-600 focus:outline-none"
                type="submit"
                :value="$t('login.main-text')"
              >
            </div>
          </form>
        </div>
      </div>
      <div class="w-136 ml-44 hidden xl:block">
        <img class="w-full" src="../assets/svg/authentication.svg">
      </div>
    </div>
    <Alert
      v-if="loginError" 
      :alertText="$t('alert.login-fail')"
    />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

import axios from 'axios'
import API_URL from '../API_URL'
import Alert from '../components/Alert.vue'

export default {
  components: { Navbar, Alert },
  data(){
    return{
      emailValue: '',
      passwordValue: '',

      user: {},
      ISjwt: this.$cookies.isKey('jwt') ? this.$cookies.isKey('jwt') : false,

      loginError: false,

      setTimeout: Function,
      setTimeoutTime: 4000
    }
  },
  created(){
    if(this.ISjwt){
      this.$router.push('/panel')
    }
  },
  methods: {
    async login(){
      clearTimeout(this.setTimeout)

      await axios.post(`${API_URL}/auth/local`, {
        identifier: this.emailValue,
        password: this.passwordValue
      })

      .then(async res=>{
        this.user = res.data

        await this.$cookies.set('jwt',this.user.jwt, '30d')
        await this.$cookies.set('user',this.user.user, '30d')

        this.$router.push('/panel')
      })
      .catch(() =>{
        this.setTimeout = setTimeout(() =>{
          this.loginError = false
        },this.setTimeoutTime)
        return this.loginError = true
      })
    },
  }
}
</script>

<style>

</style>