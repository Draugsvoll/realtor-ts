import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/main.scss";
import {createPinia} from 'pinia'

// ICONS 
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faTwitter, faFacebook, faInstagram, faYoutube)

const pinia = createPinia()
const app = createApp(App);

app.use(router);
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount("#app");

