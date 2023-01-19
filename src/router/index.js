import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  userStore.loadingSesion = true
  const user = await userStore.currentUser()
  if(user){
    next()
  }else{
    next('/login')
  }

  userStore.loadingSesion = false
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/editar/:id",
      name: "editar",
      component: () => import("../views/EditarView.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },

  ],
});

export default router;
