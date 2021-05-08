import { createRouter, createWebHistory } from "vue-router";
import PageForm from "../views/Form.vue";
import Index from "../views/Index.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Index,
  },
  {
    path: "/form",
    name: "form",
    component: PageForm,
  },
  {
    path: "/form/:id",
    name: "form-item",
    component: PageForm,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/errors/404"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/errors/404"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
