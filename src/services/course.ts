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

export const getEditCourseInfo = (id: string) => {
  return request({
    method: 'GET',
    url: '/boss//course/getCourseById',
    params: {
      courseId: id
    }
  })
}

export const changeState = (id: number, status: number) => {
  return request({
    method: 'GET',
    url: '/boss//course/changeState',
    params: {
      courseId: id,
      status
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
