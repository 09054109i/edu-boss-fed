/**
 * 角色相关请求模块
 */

import request from '@/utils/request'

export const getRolePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const createOrUpdateRole = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const deleteRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}
