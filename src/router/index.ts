import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Buy from "../views/Buy.vue";
import Rent from "../views/Rent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "/",
      component: HomeView,
    },
    {
      path: "/buy",
      name: "buy",
      component: Buy,
    },
    {
      path: "/rent",
      name: "rent",
      component: Rent,
    },
  ],
});

export default router;
