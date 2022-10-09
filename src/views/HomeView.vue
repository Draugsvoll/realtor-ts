<script setup >
  import TheWelcome from "../components/TheWelcome.vue";
  import SearchBar from "../components/SearchBar.vue";
</script>

<template>
  <main>
    <h1>HomeView</h1>
    <Search />
  </main>
</template>


<style lang="scss" scoped>
  main {
    border:2px solid blue;
  }
</style>