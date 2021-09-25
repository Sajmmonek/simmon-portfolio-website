<template>
  <div>
    <Navbar />
    <div class="flex w-full justify-center mx-auto my-32" :class="[urls.length === 0 ? 'sm:mb-56 2xl:mb-80' : '']">
      <form @submit.prevent="addDriveImages" class="container w-11/12 sm:max-w-3xl bg-gray-700 rounded-md shadow-md p-5">
        <h1 class="text-3xl font-semibold text-blue-400 mb-5">Dodaj zdjęcia do dysku</h1>

        <div class="flex flex-col">
          <label>Dodaj zdjęcia</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            required
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
          value="Dodaj zdjęcia"
          class="bg-gray-800 mt-5 p-2 rounded shadow-md hover:bg-gray-900 cursor-pointer"
        >
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

import axios from 'axios';
import API_URL from '../API_URL'

export default {
  components: {
    Navbar,
    Footer
  },
  data(){
    return{
      urls: [],
      images: [],
      imagesUrl: [],

      ISjwt: this.$cookies.isKey('jwt') ? this.$cookies.isKey('jwt') : false,
      jwt: this.$cookies.get('jwt') ? this.$cookies.get('jwt') : false,
    }
  },
  created() {
    if(!this.ISjwt){
      this.$router.push('/login')
    }
  },
  methods: {
    async onFileChange(e){
      e.target.files.forEach(image => {
        this.images.push(image)
        this.urls.push(URL.createObjectURL(image))
      })
    },
    removeImage(index){
      this.images.splice(index,1)
      this.urls.splice(index,1)
    },
    async addDriveImages(){
      await this.images.forEach(async image =>{
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
            console.log(res)
            await this.imagesUrl.push(res.data.secure_url)
            await axios.post(`${API_URL}/drive-images`,
            { url: res.data.secure_url },
            { headers: { Authorization: `Bearer ${this.jwt}` } }
            )
            .then(() => {
              if(this.images.length === this.imagesUrl.length) this.$router.push('/panel')
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
      })
    }
  }
}
</script>
