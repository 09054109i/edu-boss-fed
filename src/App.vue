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
const b = '2'
console.log(b)

interface Foo{
  a: string
  b: number
}

@Component
export default class App extends Vue {
  a = 1
  test () {
    console.log('test')
  }
}
</script>
<style lang="scss" scoped>
</style>
