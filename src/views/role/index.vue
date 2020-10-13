<template>
 <div class="role-class">
     <roleList />
 </div>
</template>
<script lang="ts">
import Vue from 'vue'
import roleList from './components/list.vue'

export default Vue.extend({
  name: 'RoleIndex',
  components: {
    roleList
  }
})
</script>
<style scoped lang = "sass">
</style>
