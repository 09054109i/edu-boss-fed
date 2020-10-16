import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index.vue')
      },
      {
        path: '/alloc-menu/:id',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/allocMenu.vue')
      },
      {
        path: '/alloc-resource/:id',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/allocResource.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index.vue')
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-createoredit' */'@/views/course/create.vue')
      },
      {
        path: '/course/:id/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-createoredit' */'@/views/course/edit.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index.vue')
      },
      {
        path: '/advert-space/create',
        name: 'advert-space-create',
        component: () => import(/* webpackChunkName: 'advert-space-createoredit' */'@/views/advert-space/create.vue')
      },
      {
        path: '/advert-space/:id/edit',
        name: 'advert-space-edit',
        component: () => import(/* webpackChunkName: 'advert-space-createoredit' */'@/views/advert-space/edit.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-createoredit' */'@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-createoredit' */'@/views/menu/edit.vue')
      },
      {
        path: '/resourceCategory',
        name: 'resourceCategory',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resourceCategory/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */'@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 父路由和子路由只要有一个需要认证，则验证登录信息
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
