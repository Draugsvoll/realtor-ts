<script setup lang="ts">
import { RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="app-container">
    <Header></Header>
    <RouterView />
    <Footer></Footer>
  </div>

</template>

<style lang="scss" scoped>

</style>
