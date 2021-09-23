<template>
  <div>
    <Navbar />
    <div class="flex w-full justify-center mx-auto my-32">
      <form @submit.prevent="editGallery" class="container w-11/12 sm:max-w-3xl bg-gray-700 rounded-md shadow-md p-5">
        <h1 class="text-white font-semibold text-3xl mb-5">Edytuj kod <span class="text-blue-400">{{ this.codeValue }}</span></h1>

        <div class="flex flex-col">
          <label>Kod</label>
          <input
            class="py-2 px-3 text-xl w-full sm:w-2/3 rounded shadow-md bg-gray-800 focus:outline-none"
            type="text"
            required
            minlength="3"
            maxlength="15"
            v-model="codeValue"
            placeholder="Np. K5F4j2H3fj (bez spacji)"
          >
        </div>
        <Alert
          v-show="codeError"
          :alertText="'Wprowadzony kod już istnieje'"
        />

        <div class="flex flex-col my-6">
          <label>Opis</label>
          <textarea
            class="py-2 px-3 text-xl w-full sm:w-3/4 rounded shadow-md bg-gray-800 focus:outline-none"
            placeholder="Np. Adam Nowak, sesja samochodowa, 12.09.2021"
            required
            v-model="descriptionValue"
            maxlength="500"
            minlength="3"
            cols="20"
            rows="10"
          ></textarea>
        </div>

        <div class="flex flex-col">
          <label>Zdjęcia</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            multiple
            @change="onFileChange($event)"
            class="bg-gray-800 w-full sm:w-2/3 p-3 rounded-md shadow-md"
          >
        </div>
        <div class="flex flex-row items-center justify-center sm:justify-start flex-wrap mt-2">
          <div
            v-for="(url, index) in urls"
            :key="url"
            class="bg-cover bg-no-repeat bg-center grid-cols-1 m-2 h-64 w-full sm:w-64 flex flex-col"
            :style="{ backgroundImage: 'url(' + url + ')' }"
          >
            <div class="flex justify-end items-end h-full">
              <svg xmlns="http://www.w3.org/2000/svg"
                @click="removeImage(index)"
                class="h-8 w-8 m-1 p-1 rounded bg-gray-800 text-white button-animation-hover cursor-pointer " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>
        </div>

        <input
          type="submit"
          value="Zapisz zmiany"
          class="bg-gray-800 text-lg px-3 py-2 mt-7 rounded shadow-md cursor-pointer hover:bg-gray-900"
        >
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Alert from '../components/Alert.vue'
import Footer from '../components/Footer.vue'

import axios from 'axios'
import API_URL from '../API_URL'

export default {
  components: {
    Navbar,
    Footer,
    Alert
  },
  data(){
    return{
      codeValue: '',
      descriptionValue: '',

      urls: [],
      images: [],
      imagesUrl: [],

      codeError: false,
      ISjwt: this.$cookies.isKey('jwt') ? this.$cookies.isKey('jwt') : false,
      jwt: this.$cookies.get('jwt') ? this.$cookies.get('jwt') : false,

      setTimeout: Function,
      setTimeoutTime: 4000,
      codeError: false
    }
  },
  props: {
    code: String,
    description: String,
    imagesProp: Array,
    codeId: String
  },
  created(){
    if(!this.ISjwt){
      this.$router.push('/login')
    }
    if(!this.code || !this.description || !this.imagesProp) {
      this.$router.push('/panel')
    }

    this.codeValue = this.code
    this.descriptionValue = this.description
    this.urls = this.imagesProp
  },
  methods: {
    async onFileChange(e){
      e.target.files.forEach(image => {
        this.urls.push(URL.createObjectURL(image))
        this.images.push(image)
      })
    },
    removeImage(index){
      this.urls.splice(index,1)
      this.images.splice(index,1)
    },
    async editGallery(){
      this.codeValue = this.codeValue.replace(/ /g,'')

      await axios.get(`${API_URL}/galleries/${this.codeValue}`)
      .then(() => {
        this.setTimeout = setTimeout(() =>{
          this.codeError = false
        },this.setTimeoutTime)
        return this.codeError = true
      })
      .catch(err => console.log(err))

      if(!this.codeError){
        await this.images.forEach(async image =>{
          let isPostedImages = false;

          const data = new FormData()
          data.append('file', image)
          data.append("api_key", '416912495735314');
          data.append("api_secret", 'YBiJZM4b-1K36oto3R9fPHygxr0');
          data.append("cloud_name", 'dz5juxdmi');
          data.append("upload_preset", "imti6imf");

          await axios.post(
            `https://api.cloudinary.com/v1_1/dz5juxdmi/image/upload`,
            data
          )
          .then(async res => {
            console.log(res.data);
            await this.imagesUrl.push(res.data.url);
            if(this.imagesUrl.length === this.images.length) isPostedImages = true;
          })
          .catch(err => console.log(err))


          if(isPostedImages){
            await axios.put(`${API_URL}/galleries/${this.codeId}`,
            { images: this.imagesUrl, code: this.codeValue, description: this.descriptionValue },
            { headers: { Authorization: `Bearer ${this.jwt}` } }
            )
            .then(() => this.$router.push('/panel'))
            .catch(err => console.log(err))
          }
        })
      }
    }
  }
}
</script>

<style>
/* created by : KordianJanowski & StanisławSztrajt © */
</style>