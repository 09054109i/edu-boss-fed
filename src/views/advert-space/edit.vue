<template>
    <CreateOrEdit :isEdit="true" />
</template>
<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuEdit',
  components: {
    CreateOrEdit
  }
})
</script>
<style scoped lang = "scss">
</style>
