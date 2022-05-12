import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import DashboardLayout from "@/views/DashboardLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "Dashboard",
    component: DashboardLayout,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
