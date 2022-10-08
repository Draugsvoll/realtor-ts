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
			<select name="" v-model="selectedState">
				<option 
					v-for="state in states" 
					:value="state"
					>
					{{state}}
				</option>
			</select>
			<h3>state: {{selectedState}}</h3>
			<button @click="search(query, selectedState)">Search</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useRouter, useRoute} from 'vue-router'
	
	const router = useRouter()
    const query = ref('new york')
	const properties = ref([])
	const states = ref(['NY', 'MI', 'CA'])
	const selectedState = ref(states._rawValue[0])

	function search(query: string, selectedState: string) {
		router.push(`/forsale?query=${query}&state=${selectedState}`)
	}
	
</script>

<style lang="scss">
.comp-container {
  border: 2px solid red;
}
</style>
