<template>
  <div>
    <Navbar />
    <div class="w-full flex flex-col items-center justify-center">
      <form
        class="w-10/12 md:w-1/2 bg-gray-700 rounded-xl shadow p-4 md:p-7 mt-56 mb-72 text-white"
        @submit.prevent="checkPassword"
        v-if="!isGivenPassword"
      >
        <label for="" class="text-xl exsm:text-2xl lg:text-3xl">
          Podaj obecne hasło
        </label>
        <input
          name="password"
          type="password"
          class="main-data-input"
          v-model="checkPasswordValue"
        >
        <input
          type="submit"
          value="Sprawdź"
          class="main-data-button"
          @submit="checkPassword"
        >
      </form>

      <div v-else class="w-full flex flex-col items-center justify-center mt-28 mb-20">
        <form @submit.prevent="saveEditedEmail" class="w-10/12 md:w-1/2 bg-gray-700 rounded-xl shadow p-4 md:p-7 mb-6 text-white">
          <label for="" class="text-lg exsm:text-xl lg:text-2xl">
            Podaj nowy adres email
          </label>
          <input
            class="main-data-input"
            v-model="emailValue"
            type="email"
            minlength="5"
            maxlength="35"
            required
          >
          <input
            type="submit"
            class="main-data-button"
            value="Zapisz zmiany"
            @submit.prevent="saveEditedEmail"
          />
        </form>

        <form @submit.prevent="saveEditedPassword" class="w-10/12 md:w-1/2 bg-gray-700 rounded-xl shadow p-4 md:p-7 mb-6 text-white">
          <label for="" class="text-lg exsm:text-xl lg:text-2xl">
            Podaj nowe hasło
          </label>
          <input
            class="main-data-input"
            type="password"
            minlength="5"
            maxlength="35"
            required
            v-model="passwordValue"
          >
          <label for="" class="text-lg exsm:text-xl lg:text-2xl">
            Powtórz nowe hasło
          </label>
          <input
            class="main-data-input"
            type="password"
            minlength="5"
            maxlength="35"
            v-model="repeatPasswordValue"
          >
          <input
            value="Zapisz zmiany"
            type="submit"
            class="main-data-button"
            @submit.prevent="saveEditedPassword"
          />
        </form>
      </div>
    </div>
    <Alert 
      v-if="alertVisible"
      :alertText="alertText"
    />

    <Footer class="w-full"/>
  </div>
</template>
<script>
import axios from 'axios'
import API_URL from '../API_URL.js'

import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Alert from '../components/Alert.vue'

export default {
  data() {
    return {
      userCookie: this.$cookies.get('user') ? this.$cookies.get('user') : false,
      ISjwt: this.$cookies.isKey('jwt') ? this.$cookies.isKey('jwt') : false,
      jwt: this.$cookies.get('jwt') ? this.$cookies.get('jwt') : false,

      user: {},

      emailValue: this.$cookies.get('user').email,

      passwordValue: '',
      repeatPasswordValue: '',

      checkPasswordValue: '',
      isGivenPassword: false,

      alertText: '',
      alertVisible: false,

      setTimeout: Function,
      setTimeoutTime: 4000
    }
  },
  components: {
    Navbar,
    Footer,
    Alert
  },
  created() {
    if(!this.ISjwt) {
      this.$router.push('/')
    }
  },
  methods: {
    async checkPassword(){
      clearTimeout(this.setTimeout)

      await axios.post(`${API_URL}/auth/local`, {
        identifier: this.userCookie.email,
        password: this.checkPasswordValue
      })
      .then(res => {
        this.isGivenPassword = true;
      })
      .catch((err) =>{
        this.setTimeout = setTimeout(()=>{
          this.alertVisible = false
        },this.setTimeoutTime)
        this.alertText = 'Podałeś nieprawidłowe hasło'
        return this.alertVisible = true
      })
    },
    async saveEditedEmail(){
      clearTimeout(this.setTimeout)
      if(this.emailValue === this.userCookie.email) return

      await axios.put(`${API_URL}/users/${this.userCookie.id}`, 
      { email: this.emailValue },
      { headers: { Authorization: `Bearer ${this.jwt}` } } 
      ).then(async res => {
        this.user = res.data;

        await this.$cookies.remove('user');
        await this.$cookies.set('user', this.user, '30d')

        this.setTimeout = setTimeout(()=>{
          this.alertVisible = false
        },this.setTimeoutTime)
        this.alertText = "Pomyślnie zmieniono email"
        return this.alertVisible = true
      })
      .catch(err => {
        console.log(err)
      })
    },
    async saveEditedPassword(){
      clearTimeout(this.setTimeout)
      if(this.passwordValue !== this.repeatPasswordValue) {
        this.setTimeout = setTimeout(()=>{
          this.alertVisible = false
        },this.setTimeoutTime)
        this.alertText = "Podane hasła się nie zgadzają"
        return this.alertVisible = true
      }

      await axios.put(`${API_URL}/users/${this.userCookie.id}`, 
      { password: this.passwordValue },
      { headers: { Authorization: `Bearer ${this.jwt}` } } 
      ).then(async res => {
        this.user = res.data;

        await this.$cookies.remove('user');
        await this.$cookies.set('user', this.user, '30d')

        this.setTimeout = setTimeout(()=>{
          this.alertVisible = false
        },this.setTimeoutTime)
        this.alertText = "Pomyślnie zmieniono hasło"
        return this.alertVisible = true
      })
      .catch(err => console.log(err))
    }
  },
}
</script>
<style>
  
</style>