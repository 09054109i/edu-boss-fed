<template>
 <div class="resource-create">
  <div slot="header" style="margin-bottom: 20px">
      <el-button @click="dialogFormVisible = true">
        添加菜单</el-button>
  </div>
  <hr />
  <el-dialog title="添加资源" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="资源名称：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源路径：" :label-width="formLabelWidth">
        <el-input v-model="form.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源分类：" :label-width="formLabelWidth">
              <el-select v-model="form.categoryId" placeholder="资源分类">
                <el-option
                :label="category.name"
                :value="category.id"
                v-for = "category in resourceCategories"
                :key = "category.id"
                ></el-option>
              </el-select>
      </el-form-item>
      <el-form-item label="描述：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
 </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getResourceCategories } from '@/services/resource-category'
import { createOrUpdateResource } from '@/services/resource'

export default Vue.extend({
  name: 'ResourceCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: '',
        description: ''
      },
      dialogFormVisible: false,
      resourceCategories: [],
      formLabelWidth: '120px'
    }
  },
  created () {
    this.loadResoucesCategory()
  },
  methods: {
    async loadResoucesCategory () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    async onSubmit () {
      console.log(this.$parent)
      const { data } = await createOrUpdateResource(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.dialogFormVisible = false
      }
    }
  }
})
</script>
<style scoped lang = "scss">
</style>
