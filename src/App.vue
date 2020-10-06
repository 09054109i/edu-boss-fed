<template>
  <div id="app">
    <h1>拉钩教育</h1>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'App',
  data () {
    return {
      a: 1,
      b: '2'
    }
  },
  methods: {
    test () {
      return this.a.test()
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
