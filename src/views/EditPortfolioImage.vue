<template>
  <div>
    <Navbar />
    <div class="flex w-full justify-center mx-auto my-32">
      <form @submit.prevent="editPortfolioImage" class="container w-11/12 sm:max-w-3xl bg-gray-700 rounded-md shadow-md p-5">
        <h1 class="text-3xl font-semibold text-blue-400 mb-5">Edytuj zdjęcie z portfolio</h1>

        <div class="flex flex-col">
          <label>Dodaj zdjęcie</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            class="bg-gray-800 w-full sm:w-2/3 p-3 rounded-md shadow-md"
            @change="onFileChange($event)"
          >
        </div>

        <div class="flex flex-col mt-5">
          <label class="mb-1 pl-2 w-full">Podgląd zdjęcia</label>
          <div
            class="bg-gray-800 bg-cover bg-no-repeat bg-center ml-1 h-72 w-full sm:w-72 rounded-md shadow-md"
            :style="{ backgroundImage: 'url(' + url + ')' }"
          >

            <div class="flex justify-end items-end h-full">
              <svg xmlns="http://www.w3.org/2000/svg"
                @click="removeImage"
                class="h-10 w-10 m-2 p-1 rounded bg-gray-800 text-white button-animation-hover cursor-pointer " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex flex-col my-5">
          <label>Opis</label>
          <textarea
            class="py-2 px-3 text-xl w-full sm:w-3/4 rounded shadow-md bg-gray-800 focus:outline-none"
            placeholder="Opis zdjęcia"
            required
            v-model="descriptionValue"
            maxlength="500"
            minlength="3"
            cols="20"
            rows="10"
          ></textarea>
        </div>

        <input
          type="submit"
          value="Zapisz zmiany"
          class="bg-gray-800 p-2 rounded shadow-md hover:bg-gray-900 cursor-pointer"
        >
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

import axios from 'axios'
import API_URL from '../API_URL'

export default {
  components: {
    Navbar,
    Footer,
  },
  data(){
    return{
      codeValue: '',
      descriptionValue: '',

      url: '',
      image: {},

      ISjwt: this.$cookies.isKey('jwt') ? this.$cookies.isKey('jwt') : false,
      jwt: this.$cookies.get('jwt') ? this.$cookies.get('jwt') : false,
    }
  },
  props: {
    imageId: String,
    description: String,
    portfolioId: String,
  },
  async created(){
    if(!this.ISjwt){
      this.$router.push('/login')
    }

    if(!this.imageId || !this.description) {
      this.$router.push('/panel')
    }

    this.descriptionValue = this.description

    await axios.get(`${API_URL}/portfolio-images/${this.imageId}`)
    .then((res) => {
      this.image = res.data
      this.url = res.data.image
    })
    .catch(err => console.log(err))

  },
  methods: {
    async onFileChange(e){
      e.target.files.forEach(image => {
        this.image = image
        this.url = URL.createObjectURL(image);
      })
    },
    removeImage(){
      this.url = ''
      this.image = ''
    },
    async editPortfolioImage(){
      let isPostedImages = false;

      const data = new FormData()
      data.append('file', this.image)
      data.append("api_key", '416912495735314');
      data.append("api_secret", 'YBiJZM4b-1K36oto3R9fPHygxr0');
      data.append("cloud_name", 'dz5juxdmi');
      data.append("upload_preset", "imti6imf");

      await axios.post(
        `https://api.cloudinary.com/v1_1/dz5juxdmi/image/upload`,
        data
      )
      .then(async res => {
        this.imageUrl = res.data.url;
        isPostedImages = true;
      })
      .catch(async err => {
        return await axios.put(`${API_URL}/portfolio-images/${this.portfolioId}`,
        { description: this.descriptionValue },
        { headers: { Authorization: `Bearer ${this.jwt}` } }
        )
        .then(() => this.$router.push('/panel'))
        .catch(err => console.log(err))
      })

      if (isPostedImages){
        await axios.put(`${API_URL}/portfolio-images/${this.portfolioId}`,
        { image: this.imageUrl, description: this.descriptionValue },
        { headers: { Authorization: `Bearer ${this.jwt}` } }
        )
        .then(() => this.$router.push('/panel'))
        .catch(err => console.log(err))
      }
    }
  }
}
</script>

<style>
/* created by : KordianJanowski & StanisławSztrajt © */
</style>