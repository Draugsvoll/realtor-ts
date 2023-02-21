<template>
	<main>
		<SearchBar/>
		<PropertyList v-if="properties" :properties="properties" />
	</main>
</template>

<script lang="ts">
import { getForRental, getForSale } from "@/api/apis";
import {ref } from "vue";
import PropertyList from "../components/PropertyList.vue";
import SearchBar from "../components/SearchBar.vue";
import PropertyComp from "../components/Property.vue";
import type {Property} from '../types/property/Property.type'
import { useRoute, useRouter } from "vue-router";
import type { SearchParams } from "@/types/property/FetchProperty.type";

	
export default {
	components: {
		PropertyComp,
		SearchBar,
		PropertyList,
  },
	setup () {
		const route = useRoute()
		const router = useRouter()
		const properties = ref(<Property[]|undefined>undefined)

		async function fetchForSaleData (parameters: SearchParams) {
			let params = parameters
			let resp:Property[] = await getForSale(params);
			console.log('for sale array: ', resp)
			properties.value = resp
		}
		async function fetchForRentalData (parameters: SearchParams) {
			let params = parameters
			let resp:Property[] = await getForRental(params);
			console.log('for rent array: ', resp)
			properties.value = resp
		}

		return {
			fetchForSaleData,
			fetchForRentalData,
			properties,
			route,
			router,
		}
	},
	mounted () {
		let params;
		if (typeof this.route.query.object === 'string') {
			params = JSON.parse(decodeURIComponent(this.route.query.object));
			if (params.buyOrRent === 'buy') this.fetchForSaleData(params)
			else if (params.buyOrRent === 'rent') this.fetchForRentalData(params)
		} else {
			alert('Error fetching user input from queryParams')
		}
	}
};

</script>

<style scoped>
	main {
		padding-top:5rem;
	}

</style>