<template>
    <div class="menu-create">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{ isEdit? '编辑菜单' : '创建菜单'}}</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="广告位名称:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { createOrUpdateAdvertSpace, getAdvertSpaceInfo } from '@/services/advert-space'

export default Vue.extend({
  name: 'AdvertSpaceCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: ''
      },
      parentMenuList: []
    }
  },
  created () {
    this.loadAdvertSpaceInfo()
  },
  methods: {
    async onSubmit () {
      const { data } = await createOrUpdateAdvertSpace(this.form)
      if (data.state === 1) {
        this.$message.success('提交成功')
        this.$router.push({
          name: 'advert-space'
        })
      }
    },
    async loadAdvertSpaceInfo () {
      const { data } = await getAdvertSpaceInfo(this.$route.params.id)
      if (this.isEdit) {
        this.form = data.content
      }
    }
  }
})
</script>
<style scoped lang = "scss">
</style>
