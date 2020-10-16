import request from '@/utils/request'
import qs from 'qs'

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
  url: '/front/user/getInfo'
})

export const getUserPages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss//user/getUserPages',
    data
  })
}

export const getUserRoleInfo = (id: number) => request({
  method: 'GET',
  url: `/boss/role/user/${id}`
})

export const allocateUserRole = (data: any) => request({
  method: 'POST',
  url: '/boss/role/allocateUserRoles',
  data
})
