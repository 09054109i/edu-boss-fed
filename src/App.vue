<template>
  <div id="app">
    <h1>拉钩教育</h1>
    <div>{{a}}</div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  a = 1
  b = '2'
  test () {
    console.log('test')
  }
}
</script>
<style lang="scss" scoped>
</style>
