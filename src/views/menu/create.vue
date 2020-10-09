<template>
    <div class="menu-create">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>创建菜单</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="菜单名称:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单路径:">
                    <el-input v-model="form.href"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单:">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="前端图标:">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item label="是否显示:">
                    <el-radio-group v-model="form.shown">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式:">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="排序:">
                    <el-input-number v-model="form.orderNum" :min="1" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'MenuCreate',
  data () {
    return {
      form: {
        description: '111',
        href: '111',
        icon: '1111',
        name: '111',
        orderNum: '1',
        parentId: -1,
        shown: false
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
})
</script>
<style scoped lang = "scss">
</style>
