<script setup >
  import TheWelcome from "../components/test/TheWelcome.vue";
  import SearchBar from "../components/SearchBar.vue";
</script>

<template>
  <main>
    <h1>HomeView</h1>
    <SearchBar />
  </main>
</template>


<style lang="scss" scoped>
  main {
    border:2px solid blue;
  }
</style>