/**
 * 广告相关请求模块
 */

import request from '@/utils/request'

export const createOrUpdateAdvert = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}

export const updateAdvertStatus = (id: number, status: number) => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params: {
      id,
      status
    }
  })
}

export const getAllAdverts = (pageNum: number, pageSize: number) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList',
    params: {
      pageNum,
      pageSize
    }
  })
}
