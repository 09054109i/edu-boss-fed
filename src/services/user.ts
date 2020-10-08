import request from '@/utils/request'
import qs from 'qs'
import store from '@/store'

/**
 * 用户请求
 */
interface User {
  phone: string
  password: string
}
export const login = (data: User) => request({
  method: 'POST',
  url: '/front/user/login',
  // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data)
})
export const getUserInfo = () => request({
  method: 'GET',
  url: '/front/user/getInfo',
  // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  headers: {
    Authorization: store.state.user.access_token
  }
})
