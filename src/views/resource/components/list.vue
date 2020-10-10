<template>
 <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="审批人">
                <el-input v-model="form.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
       <el-table
        :data="resources"
        style="width: 100%">
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
import { getResourcePages } from '@/services/resource'
import { parseDate2Str } from '@/utils/common'
export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      form: {
        user: '',
        region: '',
        current: 1,
        size: 5
      },
      total: 0,
      resources: [],
      currentPage4: 5
    }
  },
  created () {
    this.loadResources()
  },
  methods: {
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
      console.log('submit!')
    },
    async loadResources () {
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.total = data.data.total
      this.resources = this.resources.map((item: any) => {
        item.createdTime = parseDate2Str(item.createdTime)
        return item
      })
    }
  }
})
</script>
<style scoped lang = "scss">
</style>
