import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 配置选项
  // baseURL
  // timeout
})

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
request.interceptors.response.use(function (response) { // 状态码为2XX都进入这里
  console.log('响应成功')
  // 服务端使用过的自定义状态码，错误处理就写到这里
  return response
}, function (error) { // 超出2XX状态码都执行这里
  // 服务端使用过的HTTP状态码，错误处理就写到这里
  console.log('响应失败')
  if (error.response) { // 请求发出去收到响应了，但是状态码超出了2XX
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) { // 请求发出去但是没有收到响应
    console.log(error.request)
  } else { // 在设置请求时发生了一些事情，出发了一个错误
    console.log('Error', error.message)
  }
  console.log(error.config)
  // 将错误信息抛给调用者
  return Promise.reject(error)
})
export default request
