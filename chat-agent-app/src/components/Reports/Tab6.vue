<template>
  <div class="content-panel">
    <component :is="currentComponent" />
  </div>
</template>

<script>
import Tab61 from './Tab61.vue'
import Tab62 from './Tab62.vue'
import Tab63 from './Tab63.vue'
import Tab64 from './Tab64.vue'

export default {
  name: 'Tab6',
  props: {
    selectedSubTab: { type: Number, default: 61 }
  },
  computed: {
    currentComponent() {
      switch (this.selectedSubTab) {
        case 62: return Tab62
        case 63: return Tab63
        case 64: return Tab64
        default: return Tab61
      }
    }
  }
}
</script>

<style scoped>
.content-panel { background:#ffffff; margin:0; padding:0; min-height:100%; }
</style>
