<template>
	<main>
		<h1>/Search</h1>	
		<SearchBar/>
		<PropertyList v-if="dataIsReady" :properties="properties" />
	</main>
</template>

<script lang="ts">
import { getForSale } from "@/api/apis";
import {ref } from "vue";
import PropertyList from "../components/PropertyList.vue";
import SearchBar from "../components/SearchBar.vue";
import Property from "../components/Property.vue";
import type {PropertyType} from '../types/types'

	
export default {
	components: {
		Property,
		SearchBar,
		PropertyList,
  },
	setup () {
		let dataIsReady  = ref(false)
		let properties: PropertyType[] = []

		async function fetchForSaleData (query: string, state: string) {
			let resp:PropertyType[] = await getForSale(query, state);
			this.properties = resp
			this.dataIsReady  = true
		}
		return {
			fetchForSaleData,
			properties,
			dataIsReady ,
		}
	},
	mounted () {
		const query = this.$route.query.query as string || ''
		const state = this.$route.query.state as string || ''
		this.fetchForSaleData(query, state)
	}
};

</script>

<style scoped>
	main {
		border:2px solid blue;
	}

</style>