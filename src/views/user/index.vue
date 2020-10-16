<template>
 <div class="user-class">
   <UserList />
 </div>
</template>
<script lang="ts">
import Vue from 'vue'
import UserList from './components/list.vue'

export default Vue.extend({
  name: 'UserIndex',
  components: {
    UserList
  }
})
</script>
<style scoped lang = "sass">
</style>
