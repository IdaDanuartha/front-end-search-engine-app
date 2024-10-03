import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../layouts/BaseLayout.vue'),
    children : [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: '/results',
        name: 'SearchResult',
        component: () => import('../views/SearchResultView.vue'),
      },
      {
        path: '/results/:slug',
        name: 'ArticleDetail',
        component: () => import('../views/ArticleDetailView.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // When navigating back or forward, use the saved position
    } else {
      return { top: 0 }; // Scroll to top on route change
    }
  },
})

export default router;