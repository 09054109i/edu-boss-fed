<template>
 <div class=''>
   <el-card class='box-card'>
      <div class='content'>
      <div class='power'>
      <h4>权限设置</h4>
      <div v-for='(permissionTop, topIndex) in tableData' :key='topIndex' >
      <p class='checkGroup' style='width:99%;'>
      <el-checkbox :indeterminate='permissionTop.indeterminate'
      :key='topIndex' v-model='permissionTop.mychecked'
      :label='permissionTop.id'
      @change='onChangeTop(topIndex, permissionTop.id, $event)'>
      {{permissionTop.name}}</el-checkbox>
      </p>
      <div class='childrenCheckGroup'>
        <el-checkbox v-for='permissionSon in permissionTop.childrenList'
        v-model='permissionSon.mychecked'
        @change='onChangeSon(topIndex, permissionSon.id, permissionTop.id, $event)'
        :label='permissionSon.id'
        :key='permissionSon.id'>
        {{permissionSon.name}}</el-checkbox>
      </div>
      </div>
      </div>
      </div>
    <div class='buttonContent'>
        <el-button
        size='mini'
        @click='handleUpdate()'>保存</el-button>
        <el-button
        size='mini' @click='handleClear()'>清空</el-button>
    </div>
  </el-card>
 </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getAllResources, allocateResources, getRoleResource }
  from '@/services/resource'
import { getResourceCategories }
  from '@/services/resource-category'

export default Vue.extend({
  name: 'AllocResource',
  data () {
    return {
      tableData: [] as any[],
      roleResource: []
    }
  },
  mounted () {
    this.loadResources()
  },
  methods: {
    async handleUpdate () {
      const checkedKeys: any[] = []
      for (let i = 0; i < this.tableData.length; i++) {
        const childrenArray = this.tableData[i].childrenList
        for (let j = 0; j < childrenArray.length; j++) {
          const resource: any = childrenArray[j]
          if (resource.mychecked) {
            checkedKeys.push(resource.id)
          }
        }
      }
      console.log(checkedKeys)
      const id = Number.parseInt((this.$route as any).params.id)
      const { data } = await allocateResources({
        resourceIdList: checkedKeys,
        roleId: id
      })
      this.$router.push({
        name: 'role'
      })
    },
    handleClear () {
      for (let i = 0; i < this.tableData.length; i++) {
        const childrenArray = this.tableData[i].childrenList
        this.tableData[i].mychecked = false
        this.tableData[i].indeterminate = false
        for (let j = 0; j < childrenArray.length; j++) {
          const resource: any = childrenArray[j]
          resource.mychecked = false
        }
      }
    },
    async loadResources () {
      const roleId = (this.$route as any).params.id
      const { data: roleResourceData } = await getRoleResource(roleId)
      this.roleResource = roleResourceData.data
      const resourceTableData = []
      for (let i = 0; i < this.roleResource.length; i++) {
        const category: any = this.roleResource[i]
        const obj: any = {}
        obj.mychecked = false
        obj.indeterminate = false
        obj.parentCategoryId = -1
        obj.id = category.id
        obj.name = category.name
        const resourceCate: any[] = []
        let tickCount = 0
        let unTickCount = 0
        const chilrenList = category.resourceList
        const len = chilrenList.length
        for (let j = 0; j < chilrenList.length; j++) {
          const resource: any = chilrenList[j]
          const temp: any = {}
          temp.id = resource.id
          temp.parentCategoryId = resource.categoryId
          temp.name = resource.name
          temp.mychecked = resource.selected
          if (resource.selected) {
            tickCount++
          } else {
            unTickCount++
          }
          temp.indeterminate = false
          resourceCate.push(temp)
        }
        this.changeTop(tickCount, unTickCount, len, obj)
        obj.childrenList = resourceCate
        resourceTableData.push(obj)
      }
      this.tableData = resourceTableData
    },
    onChangeTop (index: number, topId: number, e: any) { // 父级change事件
      this.tableData[index].mychecked = e // 父级勾选后，子级全部勾选或者取消
      if (e === false) {
        this.tableData[index].indeterminate = false // 去掉不确定状态
      }
      const childrenArray = this.tableData[index].childrenList
      if (childrenArray !== 0) {
        for (let i = 0, len = childrenArray.length; i < len; i++) {
          childrenArray[i].mychecked = e
        }
      }
    },
    onChangeSon (topIndex: number, sonId: number, topId: number, e: any) { // 子级change事件
      const childrenArray = this.tableData[topIndex].childrenList
      let tickCount = 0
      let unTickCount = 0
      const len = childrenArray.length
      for (let i = 0; i < len; i++) {
        if (sonId === childrenArray[i].id) {
          childrenArray[i].mychecked = e
        }
        if (childrenArray[i].mychecked === true) {
          tickCount++
        }
        if (childrenArray[i].mychecked === false) {
          unTickCount++
        }
      }
      this.changeTop(tickCount, unTickCount, len, this.tableData[topIndex])
    },
    changeTop (tickCount: number, unTickCount: number, len: number, obj: any) {
      if (tickCount === len) { // 子级全勾选
        obj.mychecked = true
        obj.indeterminate = false
      } else if (unTickCount === len) { // 子级全不勾选
        obj.mychecked = false
        obj.indeterminate = false
      } else {
        obj.mychecked = true
        obj.indeterminate = true // 添加不确定状态
      }
    }
  }
})
</script>
<style scoped lang = 'scss'>
.checkGroup {
    width: 99%;
    background: rgb(242, 246, 252);
    border: 1px solid #dcdfe6;
    padding: 20px;
    margin: 0px;
}
.childrenCheckGroup{
    border: 1px solid #dcdfe6;
    padding: 20px;
}
.buttonContent {
    margin: 20px;
    align-items: flex-end;
    justify-content: center;
    display: flex;
}
</style>
