<template>
  <div class="rolo-list-class">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline" @click="onReset">
            <el-form-item prop="name" label="角色名称">
                <el-input v-model="form.name" placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
                <el-button
                  @click="onReset"
                :disabled="isLoading">重置</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div slot="header" class="clearfix">
          <el-button @click="dialogFormVisible = true">
            添加角色</el-button>
      </div>
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
        <el-form ref="newForm" :model="newForm">
          <el-form-item prop="name" label="角色名称：" :label-width="formLabelWidth">
            <el-input v-model="newForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="code" label="角色编码：" :label-width="formLabelWidth">
            <el-input v-model="newForm.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="description" label="描述：" :label-width="formLabelWidth">
            <el-input v-model="newForm.description" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onResouceUpdateCancel">取 消</el-button>
          <el-button type="primary" @click="onResouceUpdateSubmit">确 定</el-button>
        </div>
      </el-dialog>
       <el-table
        :data="roles"
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
          prop="description"
          label="描述"
          >
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleAllocMenu(scope.row)" class="el-button--text">分配菜单</el-button>
            <el-button
              size="mini"
              @click="handleAllocResource(scope.row)" class="el-button--text">分配资源</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.row)" class="el-button--text">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)" class="el-button--text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getRolePages, createOrUpdateRole, deleteRole }
  from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'RoleList',
  data () {
    return {
      form: {
        name: '',
        current: 1,
        size: 50
      },
      roles: [],
      newForm: {
        name: '',
        code: '',
        description: ''
      },
      dialogFormVisible: false,
      isLoading: false,
      formLabelWidth: '120px'
    }
  },
  created () {
    this.loadRole()
  },
  methods: {
    async loadRole () {
      this.isLoading = true
      const { data } = await getRolePages(this.form)
      this.isLoading = false
      this.roles = data.data.records
    },
    async onResouceUpdateSubmit () {
      const { data } = await createOrUpdateRole(this.newForm)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.dialogFormVisible = false
        this.loadRole()
      }
      this.newForm = { name: '', code: '', description: '' };
      (this.$refs.newForm as Form).resetFields()
    },
    onResouceUpdateCancel () {
      this.newForm = { name: '', code: '', description: '' };
      (this.$refs.newForm as Form).resetFields()
      this.dialogFormVisible = false
    },
    handleDelete (row: any) {
      this.$confirm('确认删除吗?', '提示').then(async () => {
        const { data } = await deleteRole(row.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadRole()
        }
      }).catch((err) => {
        console.log(err)
        this.$message.info('取消删除')
      })
    },
    handleEdit (row: any) {
      const { id, name, code, description } = row
      const rowObject = { id, name, code, description }
      this.newForm = rowObject
      this.dialogFormVisible = true
    },
    handleAllocMenu (row: any) {
      console.log(row)
      this.$router.push({
        name: 'alloc-menu',
        params: {
          id: row.id
        }
      })
    },
    handleAllocResource (row: any) {
      console.log(row)
      this.$router.push({
        name: 'alloc-resource',
        params: {
          id: row.id
        }
      })
    },
    onSubmit () {
      this.form.current = 1
      this.loadRole()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadRole()
    }
  }
})
</script>
<style scoped lang = 'sass'>
</style>
