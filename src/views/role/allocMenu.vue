<template>
 <div class="">
   <el-card class="box-card">
     <el-tree
    :data="menuNodes"
    ref="menuNodes"
    show-checkbox
    node-key="id"
    default-expand-all
    :default-checked-keys="defaultCheckedKeys"
    :props="defaultProps">
  </el-tree>
  <div>
      <el-button
      size="mini"
      @click="handleUpdate()">保存</el-button>
      <el-button
      size="mini"
      @click="handleClear()">清空</el-button>
  </div>
   </el-card>
 </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getMenuNodeList, getRoleMenu, allocateMenus }
  from '@/services/menu'

export default Vue.extend({
  name: 'AllocMenu',
  data () {
    return {
      menuNodes: [],
      defaultExpandedKeys: [] as any[],
      defaultCheckedKeys: [] as any[],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  created () {
    this.loadmMenuNodeList()
    this.loadCheckedMenu()
  },
  methods: {
    async handleUpdate () {
      const checkedKeys = (this.$refs.menuNodes as any).getCheckedKeys()
      const { data } = await allocateMenus({
        menuIdList: checkedKeys,
        roleId: (this.$route as any).params.id
      })
      this.$router.push({
        name: 'role'
      })
    },
    handleClear () {
      (this.$refs.menuNodes as any).setCheckedKeys([])
    },
    async loadmMenuNodeList () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menuNodes = data.data
      }
    },
    async loadCheckedMenu () {
      const roleId = (this.$route as any).params.id
      const { data } = await getRoleMenu(roleId)
      const roleMenuList = data.data
      const checkedMenu: any[] = []
      roleMenuList.forEach((item: any) => {
        if (item.selected) {
          checkedMenu.push(item.id)
        }
        const subMenuList = item.subMenuList
        if (subMenuList) {
          subMenuList.forEach((subMenu: any) => {
            if (subMenu.selected) {
              checkedMenu.push(subMenu.id)
            }
          })
        }
      })
      this.defaultCheckedKeys = checkedMenu
    }
  }
})
</script>
<style scoped lang = 'sass'>
</style>
