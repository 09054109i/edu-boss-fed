/**
 * 课程相关请求模块
 */

import request from '@/utils/request'

export const getAllCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss//course/getQueryCourses',
    data
  })
}

export const getEditCourseInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: '/boss/course/getEditCourseInfo',
    params: {
      id
    }
  })
}

export const createOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss//course/saveOrUpdateCourse',
    data
  })
}

export const allocateResources = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}

export const deleteResource = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}
