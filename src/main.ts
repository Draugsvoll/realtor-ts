import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/main.scss";
import {createPinia} from 'pinia'

// ICONS 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const pinia = createPinia()
const app = createApp(App);

app.use(router);
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount("#app");

