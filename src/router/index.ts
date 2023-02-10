import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Search from "../views/Search.vue";
import ViewProperty from "../views/PropertyDetailed.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "/",
      component: HomeView,
    },
    {
      path: "/search",
      name: "search",
      component: Search,
    },
    {
      path: "/view_property",
      name: "view_property",
      component: ViewProperty,
    },
  ],
});

export default router;
