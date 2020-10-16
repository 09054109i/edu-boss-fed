/**
 * 广告位相关请求模块
 */

import request from '@/utils/request'

export const createOrUpdateAdvertSpace = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}

export const getAdvertSpaceInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getSpaceById',
    params: {
      id
    }
  })
}

export const getAllAdvertSpaces = (pageNum: number, pageSize: number) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces',
    params: {
      pageNum,
      pageSize
    }
  })
}
