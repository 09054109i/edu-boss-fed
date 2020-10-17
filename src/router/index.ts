import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'
import { getUserPermission } from '@/services/user'
import { Store } from 'vuex'

Vue.use(VueRouter)

const constRoutes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index.vue')
  }
  // },
  // {
  //   path: '*',
  //   name: '404',
  //   component: () => import(/* webpackChunkName: '404' */'@/views/error-page/404.vue')
  // }
]
const asyncRouterMap: Array<any> = [
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          menu: '主页'
        },
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        meta: {
          menu: '权限'
        },
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index.vue')
      },
      {
        path: '/alloc-menu/:id',
        name: 'alloc-menu',
        meta: {
          menu: '权限'
        },
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/allocMenu.vue')
      },
      {
        path: '/alloc-resource/:id',
        name: 'alloc-resource',
        meta: {
          menu: '权限'
        },
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/allocResource.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        meta: {
          menu: '权限'
        },
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        meta: {
          menu: '权限'
        },
        component: () => import(/* webpackChunkName: 'menu-createoredit' */'@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        meta: {
          menu: '权限'
        },
        component: () => import(/* webpackChunkName: 'menu-createoredit' */'@/views/menu/edit.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        meta: {
          menu: '权限'
        },
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index.vue')
      },
      {
        path: '/resourceCategory',
        name: 'resourceCategory',
        meta: {
          menu: '权限'
        },
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resourceCategory/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        meta: {
          menu: '课程'
        },
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index.vue')
      },
      {
        path: '/course/create',
        name: 'course-create',
        meta: {
          menu: '课程'
        },
        component: () => import(/* webpackChunkName: 'course-createoredit' */'@/views/course/create.vue')
      },
      {
        path: '/course/:id/edit',
        name: 'course-edit',
        meta: {
          menu: '课程'
        },
        component: () => import(/* webpackChunkName: 'course-createoredit' */'@/views/course/edit.vue')
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          menu: '用户'
        },
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        meta: {
          menu: '广告'
        },
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue')
      },
      {
        path: '/advert/create',
        name: 'advert-create',
        meta: {
          menu: '广告'
        },
        component: () => import(/* webpackChunkName: 'advert-createoredit' */'@/views/advert/create.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        meta: {
          menu: '广告'
        },
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index.vue')
      },
      {
        path: '/advert-space/create',
        name: 'advert-space-create',
        meta: {
          menu: '广告'
        },
        component: () => import(/* webpackChunkName: 'advert-space-createoredit' */'@/views/advert-space/create.vue')
      },
      {
        path: '/advert-space/:id/edit',
        name: 'advert-space-edit',
        meta: {
          menu: '广告'
        },
        component: () => import(/* webpackChunkName: 'advert-space-createoredit' */'@/views/advert-space/edit.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes: constRoutes
})

const errRoute =
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */'@/views/error-page/404.vue')
  }

function routerMatch (permission: [], asyncRouter: any[]) {
  const routers: any[] = [{
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [] as any[]
  }]
  // 创建路由
  function createRouter (permission: []) {
    // 根据路径匹配到的router对象添加到routers中即可
    permission.forEach((item: any) => {
      const name = item.name
      // 循环异步路由，将符合权限列表的路由加入到routers中
      asyncRouter.find((s) => {
        if (s.path === '/') {
          s.children.find((y: any) => {
            if (y.meta.menu) {
              if (!routers[0].children.includes(y) && y.meta.menu === '主页') {
                routers[0].children.push(y)
              }
              if (name.includes(y.meta.menu)) {
                routers[0].children.push(y)
              }
            }
          })
        }
        // if (name.contains(s.meta.menu)) {
        //   routers.push(s)
        // }
      })
    })
    routers.push(errRoute)
  }

  createRouter(permission)
  return routers
}

router.beforeEach(async (to, from, next) => {
  console.log('test1')
  console.log(to)
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
      if (to.matched.length) {
        next()
      } else {
        router.replace('/')
      }
    }
  } else {
    console.log(store.state)
    if (store.state.routes.length === 0) {
      const { data } = await getUserPermission()
      const menuList = data.content.menuList
      const routers = routerMatch(menuList, asyncRouterMap)
      router.addRoutes([...routers])
      store.commit('setRoutes', routers)
    }
    if (to.matched.length) {
      next()
    } else {
      router.replace('/')
    }
  }
})

export default router
