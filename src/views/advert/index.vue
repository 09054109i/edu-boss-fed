<template>
 <div class="advert-class">
     <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({name: 'advert-create'})">添加广告</el-button>
      </div>
      <el-table
        :data="advert"
        style="width: 100%">
        <el-table-column
          label="id"
          prop="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="spaceId"
          label="广告位置"
          width="180">
        </el-table-column>
        <el-table-column
          prop="img"
          label="广告图片"
          width="180">
        </el-table-column>
        <el-table-column
          label="时间"
          width="240">
            <template slot-scope="scope">
            <div>开始时间：{{scope.row.startTimeFormatString}}</div>
            <div>到期时间：{{scope.row.endTimeFormatString}}</div>
          </template>
        </el-table-column>
         <el-table-column label="上线1/下线">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#40586f"
              inactive-color="#dcdfe6"
              @change="changeStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
 </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAllAdverts, updateAdvertStatus } from '@/services/advert'
import { parseDate2Str } from '@/utils/common'

export default Vue.extend({
  name: 'AdvertSpaceIndex',
  data () {
    return {
      advert: [],
      pageNum: 1,
      pageSize: 5
    }
  },
  created () {
    this.loadAllAdverts()
  },
  methods: {
    async loadAllAdverts () {
      const { data } = await getAllAdverts(this.pageNum, this.pageSize)
      if (data.state === 1) {
        this.advert = data.content
      }
    },
    handleEdit (row: any) {
      (this as any).$router.push({
        name: 'advert-space-edit',
        params: {
          id: row.id
        }
      })
    },
    formateDate (row: any, column: any, cellValue: any, index: any) {
      return parseDate2Str(cellValue)
    },
    async changeStatus (row: any) {
      console.log(row.status)
      this.$confirm('是否要修改上线/下线状态?', '提示').then(async () => {
        const { data } = await updateAdvertStatus(row.id, row.status)
        if (data.state === 1) {
          this.$message.success('修改成功')
        }
      }).catch((err) => {
        row.status = row.status === 1 ? 0 : 1
        console.log(err)
        this.$message.info('已取消操作!')
      })
    }
  }
})
</script>
<style scoped lang = "sass">
</style>
