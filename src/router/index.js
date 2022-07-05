import { createRouter, createWebHistory } from "vue-router";

import ListVue from "../views/ListVue.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: ListVue,
  },
  {
    path: "/list",
    name: "list",
    component: () => import("../views/ListVue.vue"),
  },
  {
    path: "/create",
    name: "posts.create",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/posts/edit/:id",
    name: "posts.edit",
    component: () => import("../views/HomeView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
