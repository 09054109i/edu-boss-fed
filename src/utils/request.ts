import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import qs from 'qs'

const request = axios.create({
  // 配置选项
  // baseURL
  // timeout
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const user = store.state.user
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
// Add a response interceptor
let isRfreshing = false
let requests: any[] = []
request.interceptors.response.use(function (response) { // 状态码为2XX都进入这里
  // console.log('响应成功')
  // 服务端使用过的自定义状态码，错误处理就写到这里
  return response
}, async function (error) { // 超出2XX状态码都执行这里
  // 服务端使用过的HTTP状态码，错误处理就写到这里
  // console.log('响应失败')
  if (error.response) { // 请求发出去收到响应了，但是状态码超出了2XX
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token无效（没有提供token、token无效、token过期
      // 如果有 refresh_token 则尝试使用refresh_token获取新的access_token
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      if (!isRfreshing) {
        isRfreshing = true
        return refreshToken().then((res) => {
          if (!res.data.state) {
            throw new Error('Token 刷新失败')
          }
          // 获取成功，把本次的失败请求重新发出去
          store.commit('setUser', res.data.content)
          requests.forEach(cb => cb())
          requests = []
          // 失败请求的信息在error.config中
          return request(error.config)
        }).catch(err => {
          redirectLogin()
          return Promise.reject(err)
        }).finally(() => {
          isRfreshing = false
        })
      }
      // 挂起所有请求
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去但是没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，出发了一个错误
    Message.error(`请求失败： ${error.message}`)
  }
  // console.log(error.config)
  // 将错误信息抛给调用者
  return Promise.reject(error)
})
export default request
