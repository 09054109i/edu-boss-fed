<template>
  <div class="aside">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router>
        <el-submenu index="1"  v-show="menus.RoleMenuShow">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
            </template>
            <el-menu-item index="/role">
                <i class="el-icon-menu"></i>
                <span slot="title">角色管理</span>
            </el-menu-item>
            <el-menu-item index="/menu">
                <i class="el-icon-menu"></i>
                <span slot="title">菜单管理</span>
            </el-menu-item>
            <el-menu-item index="/resource">
                <i class="el-icon-menu"></i>
                <span slot="title">资源管理</span>
            </el-menu-item>
        </el-submenu>
        <el-menu-item index="/course" v-show="menus.CourseMenuShow">
            <i class="el-icon-menu"></i>
            <span slot="title">课程管理</span>
        </el-menu-item>
        <el-menu-item index="/user"  v-show="menus.UserMenuShow">
            <i class="el-icon-document"></i>
            <span slot="title">用户管理</span>
        </el-menu-item>
        <el-submenu index="4"  v-show="menus.AdverseMenuShow">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>广告管理</span>
            </template>
            <el-menu-item index="/advert">
                <i class="el-icon-menu"></i>
                <span slot="title">广告列表</span>
            </el-menu-item>
            <el-menu-item index="/advert-space">
                <i class="el-icon-menu"></i>
                <span slot="title">广告位列表</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import store from '../../store'

export default Vue.extend({
  name: 'AppAside',
  data () {
    return {
      menus: {
        RoleMenuShow: false,
        CourseMenuShow: false,
        UserMenuShow: false,
        AdverseMenuShow: false
      }
    }
  },
  mounted () {
    const routesMap = (store.state.routes[0] as any).children
    routesMap.forEach((item: any) => {
      if (item.meta.menu.includes('权限')) {
        this.menus.RoleMenuShow = true
      } else if (item.meta.menu.includes('课程')) {
        this.menus.CourseMenuShow = true
      } else if (item.meta.menu.includes('用户')) {
        this.menus.UserMenuShow = true
      } else if (item.meta.menu.includes('广告')) {
        this.menus.AdverseMenuShow = true
      }
    })
  },
  methods: {
    handleOpen (key: string, keyPath: string): void{
      console.log(key, keyPath)
    },
    handleClose (key: string, keyPath: string): void{
      console.log(key, keyPath)
    }
  }
})
</script>
<style scoped lang = "scss">
  .aside{
      .el-menu{
          min-height: 100vh;
      }
  }
</style>
