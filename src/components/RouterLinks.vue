<template>
  <div :class="[
      className === 'footer' ? 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : '', 
      className === 'navbar' ? 'h-screen w-full top-0 left-0 bg-gray-800 flex flex-col items-center justify-between py-52 fixed z-30 lg:bg-transparent lg:flex lg:flex-row lg:mx-6 lg:static lg:h-auto lg:w-auto lg:p-0' : ''
    ]"
  >
    <router-link
      v-for="link in navLinks"
      :key="link.text"
      :to="link.to"
      :class="this.styleClasses[this.className]"
    >
      <svg v-if="className === 'panel'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span :class="[this.className === 'panel' ? 'mx-4 font-medium' : '']">{{ $t("navbar." + link.text) }}</span>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navLinks: [
        { to: '/', text: "main-page", id: "home" },
        { to: '/portfolio', text: "portfolio", id: "portfolio" },
        { to: '/about', text: "about-me", id: "about" },
        { to: '/check-code', text: "to-download", id: "check-code" },
        { to: '/contact', text: "contact", id: "contact" },
      ],
      styleClasses: {
        'navbar': 'text-white border-b-2 border-transparent text-xl lg:text-base mx-1.5 sm:mx-6 hover:text-gray-300',
        'footer': 'text-xs font-medium text-gray-200 uppercase',
        'panel': 'flex items-center px-4 py-2 mt-2 2xl:mt-5 transition-colors duration-200 transform rounded-md hover:bg-gray-600',
      },
    }
  },
  props: {
    className: String
  },
}
</script>