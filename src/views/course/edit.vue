<template>
    <CreateOrEdit :isEdit="true" />
</template>
<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'CourseEdit',
  components: {
    CreateOrEdit
  }
})
</script>
<style scoped lang = "scss">
</style>
