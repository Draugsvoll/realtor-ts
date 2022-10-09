<template>
	<main>
		<h1>/Rent</h1>	
		<SearchBar/>
		<SearchResults v-if="dataIsReady " :properties="properties" />
	</main>
</template>

<script lang="ts">
import { getForRental } from "@/api/apis";
import {ref } from "vue";
import SearchResults from "../components/SearchResults.vue";
import SearchBar from "../components/SearchBar.vue";
import Property from "../components/Property.vue";
	
export default {
	components: {
		Property,
		SearchBar,
		SearchResults,
  },
	setup () {
		let dataIsReady  = ref(false)
		let properties;
		async function fetchForRentData  (query: string, state: string) {
			let resp = await getForRental(query, state);
			console.log('resp: ', resp)
			this.properties = resp
			this.dataIsReady  = true
		}
		return {
			fetchForRentData ,
			properties,
			dataIsReady 
		}
	},
	mounted () {
		const query = this.$route.query.query as string || ''
		const state = this.$route.query.state as string || ''
		this.fetchForRentData (query, state)
	}
};

</script>

<style scoped>
	main {
		border:2px solid blue;
	}

</style>