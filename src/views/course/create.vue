<template>
    <CreateOrEdit />
</template>
<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'CourseCreate',
  components: {
    CreateOrEdit
  }
})
</script>
<style scoped lang = "scss">
</style>
