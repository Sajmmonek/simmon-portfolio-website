<template>
  <div>
    <div class="flex flex-row md:overflow-x-hidden">
      <div class="fixed flex flex-col w-64 min-h-screen h-full px-4 py-8 bg-gray-700 border-gray-600 border-r overflow-y-auto">
        <img class="w-3/5 ml-2" src="../assets/panel.png" alt="Panel">
        <div class="flex flex-col justify-between flex-1">
          <nav>
            <button 
              v-for="subpage in subpageButtons"
              :key="subpage.name"
              @click="activeSubpage = subpage.name.toLowerCase()" 
              class="flex w-full items-center px-4 py-2 mt-1 2xl:mt-5 transition-colors duration-200 transform rounded-md hover:bg-gray-600" href="#">
              <img class="w-6 h-6" :src="require(`../assets/svg/panel/${subpage.svg}.svg`)" alt="Icon">

              <span class="mx-4 font-medium">{{ subpage.name }}</span>
            </button>
            <hr class="my-4 2xl:my-6" />
            <RouterLinks :className="'panel'" />
          </nav>
          <div class="flex flex-col items-start mt-10">
            <router-link to="/change-login-details" class="flex items-center px-4 -mx-2 mb-4">
              <img class="object-cover mx-2 rounded-full h-8 w-8" src="../assets/avatar.png" alt="avatar"/>
              <h4 class="mx-2 font-medium">Simmon</h4>
            </router-link>
            <button class="flex items-center px-4 -mx-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <h4 class="mx-2 font-medium" @click="logout">Wyloguj</h4>
            </button>
          </div>
        </div>
      </div>
      
      <div class="ml-64">
        <PanelCodes 
          v-if="activeSubpage === 'kody'" 
          :jwt="jwt"
        />

        <PanelPortfolio 
          v-else-if="activeSubpage === 'portfolio'" 
          :jwt="jwt"
        />
        
        <PanelDrive
          v-else
          :jwt="jwt"
        />
      </div>

    </div>
  </div>
</template>
<script>
import RouterLinks from '../components/RouterLinks.vue'
import PanelCodes from '../components/PanelCodes.vue'
import PanelPortfolio from '../components/PanelPortfolio.vue'
import PanelDrive from '../components/PanelDrive.vue'

export default {
  data() {
    return {
      ISjwt: this.$cookies.isKey('jwt') ? this.$cookies.isKey('jwt') : false,
      jwt: this.$cookies.get('jwt') ? this.$cookies.get('jwt') : false,

      activeSubpage: 'kody',
      subpageButtons: [
        { name: "Kody", svg: "ticket" },
        { name: "Portfolio", svg: "image" },
        { name: "Dysk", svg: "drive" }
      ]
    }
  },
  components: {
    RouterLinks,
    PanelCodes,
    PanelPortfolio,
    PanelDrive
  },
  async created() {
    if(!this.ISjwt){
      this.$router.push('/login')
    }
  },
  methods: {
    async logout(){
      await this.$cookies.remove('jwt');
      await this.$cookies.remove('user');
      this.$router.push('/')
    },
  },
}
</script>