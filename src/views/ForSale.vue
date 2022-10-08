<template>
	<main>
		<h1>For Sale</h1>	
		<Search/>
		<!-- <SearchResults /> -->
		<Property v-if="ready"  :property="properties" />
	</main>
</template>

<script lang="ts">
import { getForSale } from "@/api/apis";
import { computed, onMounted, ref } from "vue";
import SearchResults from "../components/SearchResults.vue";
import Search from "../components/Search.vue";
import Property from "../components/Property.vue";

	
	
export default {
	components: {
		Property,
		Search,
  },
	setup () {
		let ready = ref(false)
		let properties = ref('hei')
		async function fetchData (query: string, state: string) {
			let resp = await getForSale(query, state);
			console.log('resp: ', resp[0].listing_id)
			this.properties = resp[0].listing_id
			this.ready = true
		}
		return {
			fetchData,
			properties,
			ready
		}
	},
	mounted () {
		this.fetchData('new york', 'NY')
	}
};

</script>

<style scoped>
	main {
		border:2px solid blue;
	}

</style>