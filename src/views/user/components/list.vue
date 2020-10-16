<template>
 <div class="user-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline" @click="onReset">
            <el-form-item prop="phone" label="手机号">
                <el-input v-model="form.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="time" label="注册时间">
              <el-date-picker
                v-model="form.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
                <el-button
                  @click="onReset"
                :disabled="isLoading">重置</el-button>
            </el-form-item>
        </el-form>
      </div>
       <el-table
        :data="users"
        style="width: 100%"  v-loading="isLoading">
        <el-table-column
          prop="id"
          label="用户ID"
          >
        </el-table-column>
        <el-table-column
          label="头像"
         >
         <template slot-scope="scope">
            <el-avatar :size="40" :src="scope.row.portrait || require('@/assets/default-image.jpg')"></el-avatar>
         </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
        <template slot-scope="scope">
          <i title="状态" class="status"
          :class="[scope.row.status==='ENABLE'? 'status-success' : 'status-danger']"></i>
        </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleAllocMenu(scope.row)" class="el-button--text">禁用</el-button>
            <el-button
              size="mini"
              @click="handleAllocRoll(scope.row)" class="el-button--text">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
 </div>
</template>
<script lang="ts">
import Vue from 'vue'

import { getUserPages, getUserRoleInfo, allocateUserRole } from '@/services/user'

import { parseDate2Str } from '@/utils/common'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      form: {
        phone: '',
        time: '',
        currentPage: 1,
        pageSize: 5
      },
      total: 0,
      users: [],
      isLoading: false,
      formLabelWidth: '120px'
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.currentPage = 1
      this.loadUsers()
    },
    handleSizeChange (val: number) {
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadUsers()
    },
    handleCurrentChange (val: number) {
      this.form.currentPage = val
      this.loadUsers()
    },
    onSubmit () {
      this.form.currentPage = 1
      this.loadUsers()
    },
    async loadUsers () {
      this.isLoading = true
      const { data } = await getUserPages(this.form)
      this.users = data.data.records
      this.total = data.data.total
      this.isLoading = false
    }
  }
})
</script>
<style scoped lang = "scss">
</style>
