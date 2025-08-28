<script setup>
// 暂时不需要导入 TheWelcome
// import TheWelcome from '../components/TheWelcome.vue'
import { ref } from 'vue';

const sidebarVisible = ref(false);

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};
</script>

<template>
  <div class="home-container">
  <div class="dashboard-container">
    <img src="@/assets/0_Base.png" alt="Dashboard" class="dashboard-image" />
  </div> 
  </div>
</template>

<style scoped>

.dashboard-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  overflow: auto;
}

.dashboard-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  max-height: 100%;
}
</style>
