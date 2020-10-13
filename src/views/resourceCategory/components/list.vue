<template>
 <div class="resouceCategory-class">
     <el-card class="box-card">
      <div slot="header" class="clearfix">
          <el-button @click="dialogFormVisible = true">
            添加资源分类</el-button>
      </div>
      <el-dialog title="添加资源分类" :visible.sync="dialogFormVisible">
        <el-form ref="newForm" :model="newForm">
          <el-form-item prop="name" label="资源名称：" :label-width="formLabelWidth">
            <el-input v-model="newForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="sort" label="排序:" :label-width="formLabelWidth">
            <el-input-number v-model="newForm.sort" :min="0" value="0" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onResouceUpdateCancel">取 消</el-button>
          <el-button type="primary" @click="onResouceUpdateSubmit">确 定</el-button>
        </div>
      </el-dialog>
       <el-table
        :data="resourceCategories"
        style="width: 100%"  v-loading="isLoading">
        <el-table-column
          prop="id"
          label="编号"
          type="index"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
         >
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
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
    </el-card>
 </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getResourceCategories, deleteResourceCategory, createOrUpdateResourceCategory } from '@/services/resource-category'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'resouceCategoryList',
  data () {
    return {
      resourceCategories: [],
      newForm: {
        name: '',
        sort: 0
      },
      dialogFormVisible: false,
      isLoading: false,
      formLabelWidth: '120px'
    }
  },
  created () {
    this.loadResoucesCategory()
  },
  methods: {
    async loadResoucesCategory () {
      this.isLoading = true
      const { data } = await getResourceCategories()
      this.isLoading = false
      this.resourceCategories = data.data
    },
    async onResouceUpdateSubmit () {
      const { data } = await createOrUpdateResourceCategory(this.newForm)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.dialogFormVisible = false
        this.loadResoucesCategory()
      }
      this.newForm = { name: '', sort: 0 };
      (this.$refs.newForm as Form).resetFields()
    },
    onResouceUpdateCancel () {
      this.newForm = { name: '', sort: 0 };
      (this.$refs.newForm as Form).resetFields()
      this.dialogFormVisible = false
    },
    handleDelete (row: any) {
      this.$confirm('确认删除吗?', '提示').then(async () => {
        const { data } = await deleteResourceCategory(row.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadResoucesCategory()
        }
      }).catch((err) => {
        console.log(err)
        this.$message.info('取消删除')
      })
    },
    handleEdit (row: any) {
      const { id, name, sort } = row
      const rowObject = { id, name, sort }
      this.newForm = rowObject
      this.dialogFormVisible = true
    }
  }
})
</script>
<style scoped lang = 'sass'>
</style>
