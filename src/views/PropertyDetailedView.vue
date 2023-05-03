<template>
	<main>
		<PropertyDetailedComp v-if="property" :property="property" />
		<MortgageCalculator v-if="price" :price="price"></MortgageCalculator>
	</main>
</template>

<script setup lang="ts">
	import { getPropertyDetails } from '@/api/apis'
	import { onMounted, ref } from 'vue'
	import type { PropertyDetailed } from '@/types/property/detailed/PropertyDetailed.type'
	import PropertyDetailedComp from '@/components/property/PropertyDetailed.vue'
	import {useRoute} from 'vue-router'
	import MortgageCalculator from '@/components/MortgageCalculator.vue'

	const property = ref(<PropertyDetailed|undefined>undefined)
	const currentPhoto = ref(<string|undefined> undefined)
	const route = useRoute()

	const price = ref(<any>undefined)

	const fetchProperty = async (id: string) => {
		let resp = await getPropertyDetails(id)
		property.value = resp.properties[0]
		console.error('1234 propery', resp.properties[0] )
		price.value = property.value?.price
		try {
			currentPhoto.value = property.value?.photos[0].href
		}
		catch {
			alert('Property lacking photos')
		}
	}

	onMounted(() => {
		const property_id = route.query.id as string || ''
		fetchProperty(property_id)
	})
</script>




<style scoped lang="scss">
main {
	background: var(--color-white);
	padding:0.2rem;
	padding-top:5rem;
}
</style>