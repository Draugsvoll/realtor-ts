import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import SearchPropertyView from "../views/SearchPropertyView.vue";
import ViewProperty from "../views/PropertyView.vue";

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
      component: SearchPropertyView,
    },
    {
      path: "/view_property",
      name: "view_property",
      component: ViewProperty,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
  ],
});

export default router;
