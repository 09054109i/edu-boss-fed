<template>
  <div id="app">
    <h1>拉钩教育</h1>
    <router-view/>
    <p class="text">hello world</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App'
})
</script>
<style lang="scss" scoped>
// @import "~@/styles/variables.scss";
  .text {
    color: $primary-color
  }
</style>
