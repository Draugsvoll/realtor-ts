
<template>
	<div>
		<h1>Search Results</h1>
		<Property v-for="property in properties" :property="property" />
	</div>
</template>

<script setup lang="ts">
	import Property from "./Property.vue";

	const props = defineProps(['properties',])
</script>

<style scoped>
	
</style>