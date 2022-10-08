import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ForSale from "../views/ForSale.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/forsale",
      name: "forsale",
      component: ForSale,
    },
  ],
});

export default router;
