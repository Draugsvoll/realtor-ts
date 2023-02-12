<template>
	<main>
		<h1>/Search</h1>	
		<SearchBar/>
		<PropertyList v-if="dataIsReady" :properties="properties" />
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
import type { FetchPropertiesForSaleParams } from "@/types/property/FetchProperty.type";

	
export default {
	components: {
		PropertyComp,
		SearchBar,
		PropertyList,
  },
	setup () {
		const route = useRoute()
		const router = useRouter()
		const dataIsReady  = ref(false)
		const properties = ref()

		async function fetchForSaleData (parameters: FetchPropertiesForSaleParams) {
			let params = parameters
			let resp:Property[] = await getForSale(params);
			console.log('for sale array: ', resp)
			properties.value = resp
			dataIsReady.value  = true
		}

		async function fetchForRentData (query: string, state: string) {
			let resp:Property[] = await getForRental(query, state);
			properties.value = resp
			dataIsReady.value  = true
		}
		return {
			fetchForSaleData,
			properties,
			dataIsReady,
			fetchForRentData,
			route,
			router,
		}
	},
	mounted () {
		// const query = this.$route.query.query as string || ''
		// const state = this.$route.query.state as string || ''
		// const action = this.$route.query.action as string || ''
		// if 	(action === 'buy') this.fetchForSaleData()
		// else if (action === 'rent') this.fetchForRentData(query, state)
		let params;
		if (typeof this.route.query.object === 'string') {
			params = JSON.parse(decodeURIComponent(this.route.query.object));
		} 
		this.fetchForSaleData(params)
	}
};

</script>

<style scoped>
	main {
	}

</style>