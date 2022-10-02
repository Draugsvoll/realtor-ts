<script setup >
  import TheWelcome from "../components/TheWelcome.vue";
  import SearchComp from "../components/SearchComp.vue";
</script>

<template>
  <div class="view-container">
    <h1>HomeView</h1>
    <SearchComp />
    <TheWelcome />
  </div>
</template>


<style lang="scss">
  .view-container {
    border:2px solid blue;
  }
</style>