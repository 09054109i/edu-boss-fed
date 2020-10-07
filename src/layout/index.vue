<template>
  <el-container>
    <el-aside width="200px">
        <Aside/>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
          <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import Aside from './components/app-aside.vue'
export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    Aside
  }
})
</script>
<style scoped lang = "scss">
  .el-container{
    min-height: 100vh;
    min-width: 980px;
  }
  .el-aside{
    background: #d3dce6;
  }
  .el-header{
    background: #b3c0d1;
  }
  .el-main{
    background: #e9eef3;
  }
</style>
