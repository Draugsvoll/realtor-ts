<template>
	<main>
		<h1>/View_property </h1>
	</main>
</template>

<script lang="ts">
import { getPropertyDetails } from '@/api/apis';

export default {
	setup () {
		async function fetchProperty (id: string) {
			const resp = await getPropertyDetails(id)
			const property = resp.properties[0]
			console.log('resp: ', property)
		}
		return {fetchProperty}
	},
	mounted () {
		console.log('route: ', this.$route.query.id)
		const property_id = this.$route.query.id as string || ''
		this.fetchProperty(property_id)
	}
};
</script>

<style scoped>

</style>