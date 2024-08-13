import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Admin from '../components/Admin.vue';
import store from '../store';
import LoginView from '../views/LoginView.vue'; // Login view
import HomeView from '../views/HomeView.vue'; // Home view
import AdminView from '../views/AdminView.vue'; // Admin view


const routes = [
  {
    path: '/login',
    component: LoginView,
    children: [
      { path: '', component: Login },
    ]
  },
  {
    path: '/',
    component: HomeView,
    // Define routes that use the main layout
    children: [
      // Add routes here that use the MainLayout
    ]
  },
  {
    path: '/admin',
    component: AdminView,
    children: [
      { path: '', component: Admin, meta: { requiresAuth: true } }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' } // Catch-all route
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
    await store.dispatch('checkAuth');
    const isAuthenticated = store.state.isAuthenticated;
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
      next('/login'); // Redirect to login if not authenticated
    } else {
      next();
    }
  });

export default router;
