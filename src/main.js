import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import VueCookies from 'vue3-cookies'

import en from './assets/i18n/en.json'
import pl from './assets/i18n/pl.json'
import de from './assets/i18n/de.json'

import { createI18n } from 'vue-i18n/index';

const i18n = createI18n({
  locale: localStorage.getItem('lang'),
  messages: {
    en: en,
    pl: pl,
    de: de,
  }
});

const app = createApp(App);
app.use(VueCookies)
app.use(router)
app.use(i18n)
app.mount("#app");
//created by : KordianJanowski & StanisławSztrajt ©