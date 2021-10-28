import { createRouter, createWebHistory } from 'vue-router'
import Blog from '../views/Blog.vue'

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "Blog" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'BlogS',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Blog.vue')
  },
  {
    path: '/project',
    name: 'Project',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/project/index.vue')
  },
  {
    path: '/series',
    name: 'Series',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/series/index.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/detail/index.vue')
  },

  {
    path: '/tools',
    name: 'Tools',
    component: () => import(/* webpackChunkName: "tools" */ '../views/tools/index.vue'),
    children: [
      {
        // juejin 将被渲染到 tools 的 <router-view> 内部
        path: 'juejin',
        component: () => import(/* webpackChunkName: "tools" */ '../views/tools/juejin/index.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
