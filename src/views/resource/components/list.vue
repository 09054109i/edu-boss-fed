<template>
 <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline" @click="onReset">
            <el-form-item prop="name" label="资源名称">
                <el-input v-model="form.name" placeholder="资源名称"></el-input>
            </el-form-item>
            <el-form-item prop="url" label="资源路径">
                <el-input v-model="form.url" placeholder="资源路径"></el-input>
            </el-form-item>
            <el-form-item prop="categoryId" label="资源分类">
                <el-select v-model="form.categoryId" placeholder="资源分类">
                <el-option
                :label="category.name"
                :value="category.id"
                v-for = "category in resourceCategories"
                :key = "category.id"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
                <el-button
                  @click="onReset"
                :disabled="isLoading">重置</el-button>
            </el-form-item>
        </el-form>
      </div>
      <CreateOrEdit />
       <el-table
        :data="resources"
        style="width: 100%"  v-loading="isLoading">
        <el-table-column
          prop="date"
          label="编号"
          type="index"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
         >
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
          >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
        >
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
 </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './CreateOrEdit.vue'

import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'

import { parseDate2Str } from '@/utils/common'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'ResourceList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: '',
        current: 1,
        size: 5
      },
      total: 0,
      resources: [] as any[],
      resourceCategories: [],
      isLoading: false
    }
  },
  created () {
    this.loadResources()
    this.loadResoucesCategory()
  },
  methods: {
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResources()
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResources()
    },
    onSubmit () {
      this.form.current = 1
      this.loadResources()
    },
    async loadResources () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.total = data.data.total
      this.isLoading = false
      this.resources = this.resources.map((item: any) => {
        item.createdTime = parseDate2Str(item.createdTime)
        return item
      })
    },
    async loadResoucesCategory () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    }
  }
})
</script>
<style scoped lang = "scss">
</style>
