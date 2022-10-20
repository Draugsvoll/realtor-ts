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
			<select v-model="selectedState">
				<option 
					v-for="state in states" 
					:value="state"
					>{{state}}
				</option>
			</select>
			<button @click="search(query, selectedState)">Search</button> <br>
			<div class="filters-container">
				<div class="filter">
					<p>Square feet</p>
					<input type="number">
					<select name="" id=""></select>
				</div>
				<div class="filter">
					<p>Price</p>
					<select name="" id=""></select>
					<select name="" id=""></select>
				</div>
				<div class="filter">
					<p>Bathrooms</p>
					<select v-model="selectedBath">
						<option 
							v-for="bath in baths"
							:value="bath"
							>{{bath}}
						</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useRouter, useRoute} from 'vue-router'
	
	const router = useRouter()
    const query = ref('new york')

	const states = ref(['NY', 'MI', 'CA'])
	const selectedState = ref(states._rawValue[0])
	
	const baths = ref([1, 2, 3, 4])
	const selectedBath = ref(baths._rawValue[0])

	function search(query: string, selectedState: string) {
		router.push(`/forsale?query=${query}&state=${selectedState}`)
	}
	
</script>

<style lang="scss">
.comp-container {
  border: 2px solid red;
}
.filters-container {
	display: flex;
	gap:2rem;

	.filter {
		max-width:250px;

		select {
			width:40px;
		}
	}
}
</style>
