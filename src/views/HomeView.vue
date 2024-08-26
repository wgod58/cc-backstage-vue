<script setup>
import { RouterView } from 'vue-router';
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <div class="container">
  <div class="sidebar">
    <Sidebar></Sidebar>
  </div>
  <div class="routerview">
    <RouterView></RouterView>
  </div>
</div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
.container{
  display: flex;
  height: 100vh;
}
.sidebar{
}
.routerview{
  flex-grow: 1;
  padding: 20px;
  background-color: #ADADAD;
  overflow-y: auto;

}
</style>
