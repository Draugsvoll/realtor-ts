import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import FinanceView from "../views/FinanceView.vue";
import SearchResultsView from "../views/SearchPropertiesView.vue";
import ViewPropertyDetailed from "../views/PropertyDetailedView.vue";

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
      component: SearchResultsView,
    },
    {
      path: "/view_property",
      name: "view_property",
      component: ViewPropertyDetailed,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/finance",
      name: "finance",
      component: FinanceView,
    },
  ],
});

export default router;
