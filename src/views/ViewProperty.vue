<template>
	<main>
		<h1>/View_property </h1>
	</main>
</template>

<script lang="ts">
export default {
	setup () {
	},
	mounted () {
		console.log('route: ', this.$route.query.id)
	}
};
</script>

<style scoped>

</style>