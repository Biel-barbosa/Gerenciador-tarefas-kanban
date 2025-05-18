import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { initializeFirebase } from '../firebase/config';

// Initialize Firebase before using any Firebase services
initializeFirebase();

// Pages
import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import TaskBoard from '../views/TaskBoard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/tasks',
    name: 'TaskBoard',
    component: TaskBoard,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  
  if (requiresAuth && !authStore.isAuthenticated()) {
    next('/login');
  } else if (requiresGuest && authStore.isAuthenticated()) {
    next('/tasks');
  } else {
    next();
  }
});

export default router;