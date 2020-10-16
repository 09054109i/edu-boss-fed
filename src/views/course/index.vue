<template>
 <div class="course">
     <el-card class="box-card">
      <div slot="header" class="clearfix">
         <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
            <el-form-item prop="courseName" label="课程名称">
                <el-input v-model="form.courseName" placeholder="课程名称"></el-input>
            </el-form-item>
            <el-form-item prop="status" label="课程分类">
                <el-select v-model="form.status" placeholder="课程分类">
                <el-option
                :label="status.name"
                :value="status.value"
                v-for = "status in statusList"
                :key = "status.value"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
            </el-form-item>
        </el-form>
        <el-button @click="$router.push({name: 'course-create'})">新增课程</el-button>
      </div>
      <el-table
        :data="course"
        style="width: 100%" v-loading='isLoading'>
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          width="180">
        </el-table-column>
        <el-table-column
          :formatter="formatePrice"
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <i title="下架" class="status"
            :class="[scope.row.status? 'status-success' : 'status-danger']"></i>
          </template>
        </el-table-column>
         <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :class="[!scope.row.status? 'el-button--success' : 'el-button--danger']"
              @click="changeState(scope)">{{scope.row.status?'下架':'上架'}}</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
 </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAllCourses, changeState } from '@/services/course'

export default Vue.extend({
  name: 'CoursesIndex',
  data () {
    return {
      course: [] as any[],
      statusList: [
        {
          name: '全部',
          value: ''
        },
        {
          name: '上架',
          value: '1'
        },
        {
          name: '下架',
          value: '0'
        }
      ],
      form: {
        courseName: '',
        status: '',
        currentPage: 1,
        pageSize: 200
      },
      isLoading: false
    }
  },
  created () {
    this.loadAllCourses()
  },
  methods: {
    onSubmit () {
      this.loadAllCourses()
    },
    formatePrice (row: any, column: any, cellValue: any, index: any) {
      return '¥' + cellValue
    },
    async loadAllCourses () {
      this.isLoading = true
      const { data } = await getAllCourses(this.form)
      console.log(data)
      if (data.code === '000000') {
        this.course = data.data.records
      }
      this.isLoading = false
    },
    handleEdit (row: any) {
      (this as any).$router.push({
        name: 'course-edit',
        params: {
          id: row.id
        }
      })
    },
    async changeState (scope: any) {
      const index = scope.$index
      const row = scope.row
      const changeStatus = row.status ? 0 : 1

      console.log(scope.$index)
      const { data } = await changeState(row.id, changeStatus)
      row.status = changeStatus
      if (data.code === '000000') {
        this.$set(this.course, index, row)
        // this.course[2].status = changeStatus
      }
    }
  }
})
</script>
<style scoped lang = "sass">
</style>
