<template>
 <div class="resouceCategory-class">
     <resouceCategoryList />
 </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import resouceCategoryList from './components/list.vue'

export default Vue.extend({
  name: '',
  components: {
    resouceCategoryList
  }
})
</script>
<style scoped lang = 'sass'>
</style>
