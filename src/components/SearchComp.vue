<!-- eslint-disable prettier/prettier -->
<template>
	<div class="comp-container">
		<h1>SearchComp</h1>
		<div class="btn-row">
			<button>Buy</button>
			<button>Sell</button>
		</div>
		<div class="searchBar">
			<input v-model="query" type="text">
			<button @click="search(query)">Search</button>
		</div>
	</div>
</template>

<script setup >
import { ref } from 'vue'
import axios from 'axios'
import {getForSale} from '@/api/apis'

    const query = ref('new york')
	const properties = ref([])

	
	async function search (query) {
		const test = await getForSale(query)
		console.log('success: ', test)
	}

	const test =  import.meta.env.VITE_TEST
	console.log('env var: ', test)

</script>

<style lang="scss">
.comp-container {
  border: 2px solid red;
}
</style>
