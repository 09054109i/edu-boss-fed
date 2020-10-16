<template>
 <div class="advert-space-class">
     <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({name: 'advert-space-create'})">添加广告位</el-button>
      </div>
      <el-table
        :data="advertSpace"
        style="width: 100%">
        <el-table-column
          label="spaceKey"
          prop="spaceKey"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告位名称"
          width="180">
        </el-table-column>
        <el-table-column
          :formatter="formateDate"
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
         :formatter="formateDate"
          prop="updateTime"
          label="更新时间"
          width="180">
        </el-table-column>
         <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
 </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAllAdvertSpaces } from '@/services/advert-space'
import { parseDate2Str } from '@/utils/common'

export default Vue.extend({
  name: 'AdvertSpaceIndex',
  data () {
    return {
      advertSpace: [],
      pageNum: 1,
      pageSize: 5
    }
  },
  created () {
    this.loadAllAdvertSpaces()
  },
  methods: {
    async loadAllAdvertSpaces () {
      const { data } = await getAllAdvertSpaces(this.pageNum, this.pageSize)
      if (data.state === 1) {
        this.advertSpace = data.content
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
    }
  }
})
</script>
<style scoped lang = "sass">
</style>
