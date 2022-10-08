<template>
	<div>
		<!-- <p>{{property.bath}}</p> -->
		<p>{{props.property}}</p>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps(['property',])
	console.log('hello from Property comp. ', props)
</script>


<style scoped>

</style>