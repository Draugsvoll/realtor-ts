<!-- eslint-disable prettier/prettier -->
<template>
	<div class="container">
		<h1>SearchComp</h1>
		<div class="btn-row">
			<button @click="toggleAction('buy')" :class="{ 'highlighted': action === 'buy' }">Buy</button>
			<button @click="toggleAction('rent')" :class="{ 'highlighted': action === 'rent' }">Rent</button>
		</div>
		<div class="searchBar">
			<input v-model="query" type="text">
			<select v-model="userInput.selected_state" class="select-state">
				<option 
					v-for="state in states" 
						:value="state"
					>{{state.name}}
				</option>
			</select>
			<button @click="search()">Search</button> <br>
			<div class="filters-container">
				<p>sqft_min</p>
				<input v-model="userInput.selected_sqft_min" type="number" min="1" step="1">
				
				<p>sqft_max</p>
				<input v-model="userInput.selected_sqft_max" type="number" min="1" step="1">

				<p>price_min</p>
				<input v-model="userInput.selected_price_min" type="number" min="1" step="1">

				<p>price_max</p>
				<input v-model="userInput.selected_price_max" type="number" min="1" step="1" placeholder="">

				<p>baths_min_options</p>
				<select v-model="userInput.selected_baths_min">
					<option 
						v-for="bath in baths_min_options"
						:value="bath"
						>{{bath}}
					</option>
				</select>

				<p>beds_min_options</p>
				<select v-model="userInput.selected_beds_min">
					<option 
						v-for="bed in beds_min_options"
						:value="bed"
						>{{bed}}
					</option>
				</select>

				<p>max age (years)</p>
				<select v-model="userInput.selected_age_max">
					<option 
						v-for="age in age_max_options"
						:value="age"
						>{{age}}
					</option>
				</select>

				<button @click="()=> {userInput.selected_price_min = undefined}">reset</button>
				
				<!-- <div class="filter">
					<p>Square feet</p>
					<div class="input-container">
						<input type="number">
						<input type="number">
					</div>
				</div>
				<div class="filter">
					<div class="input-container">
						<p>Price</p>
						<input type="number">
						<p>Price2</p>
						<input type="number">
					</div>
				</div>
				<div class="filter">
					<p>Baths min</p>
					<select v-model="selected_baths_min">
						<option 
							v-for="bath in baths"
							:value="bath"
							>{{bath}}
						</option>
					</select>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {useRouter} from 'vue-router'
import type {FetchPropertiesForSaleParams} from '@/types/property/FetchProperty.type'
import { getForSale } from '@/api/apis';
	
	const router = useRouter()
    const query = ref('new york')

	const states = [
		{ name: 'Alabama', code: 'AL' },
		{ name: 'Alaska', code: 'AK' },
		{ name: 'Arizona', code: 'AZ' },
		{ name: 'Arkansas', code: 'AR' },
		{ name: 'California', code: 'CA' },
		{ name: 'Colorado', code: 'CO' },
		{ name: 'Connecticut', code: 'CT' },
		{ name: 'Delaware', code: 'DE' },
		{ name: 'Florida', code: 'FL' },
		{ name: 'Georgia', code: 'GA' },
		{ name: 'Hawaii', code: 'HI' },
		{ name: 'Idaho', code: 'ID' },
		{ name: 'Illinois', code: 'IL' },
		{ name: 'Indiana', code: 'IN' },
		{ name: 'Iowa', code: 'IA' },
		{ name: 'Kansas', code: 'KS' },
		{ name: 'Kentucky', code: 'KY' },
		{ name: 'Louisiana', code: 'LA' },
		{ name: 'Maine', code: 'ME' },
		{ name: 'Maryland', code: 'MD' },
		{ name: 'Massachusetts', code: 'MA' },
		{ name: 'Michigan', code: 'MI' },
		{ name: 'Minnesota', code: 'MN' },
		{ name: 'Mississippi', code: 'MS' },
		{ name: 'Missouri', code: 'MO' },
		{ name: 'Montana', code: 'MT' },
		{ name: 'Nebraska', code: 'NE' },
		{ name: 'Nevada', code: 'NV' },
		{ name: 'New Hampshire', code: 'NH' },
		{ name: 'New Jersey', code: 'NJ' },
		{ name: 'New Mexico', code: 'NM' },
		{ name: 'New York', code: 'NY' },
		{ name: 'North Carolina', code: 'NC' },
		{ name: 'North Dakota', code: 'ND' },
		{ name: 'Ohio', code: 'OH' },
		{ name: 'Oklahoma', code: 'OK' },
		{ name: 'Oregon', code: 'OR' },
		{ name: 'Pennsylvania', code: 'PA' },
		{ name: 'Rhode Island', code: 'RI' },
		{ name: 'South Carolina', code: 'SC' },
		{ name: 'South Dakota', code: 'SD' },
		{ name: 'Tennessee', code: 'TN' },
		{ name: 'Texas', code: 'TX' },
		{ name: 'Utah', code: 'UT' },
		{ name: 'Vermont', code: 'VT' },
		{ name: 'Virginia', code: 'VA' },
		{ name: 'Washington', code: 'WA' },
		{ name: 'West Virginia', code: 'WV' },
		{ name: 'Wisconsin', code: 'WI' },
		{ name: 'Wyoming', code: 'WY' }
	]

	// user input options
	const baths_min_options = ref(generateNumberArray(5))
	const beds_min_options = ref(generateNumberArray(5))
	const age_max_options = ref(generateNumberArray(50))

	// inputs from user
	const userInput = reactive({
      selected_baths_min: undefined as number | undefined,
      selected_beds_min: undefined as number | undefined,
      selected_age_max: undefined as number | undefined,
      selected_state: states[0],
      selected_sqft_min: undefined as number | undefined,
      selected_sqft_max: undefined as number | undefined,
      selected_price_min: undefined as number | undefined,
      selected_price_max: undefined as number | undefined
    });

	const action = ref(<buyOrRent>'buy')
	type buyOrRent = 'buy' | 'rent'

	function generateNumberArray(number: number): number[] {
		let numberArray = []
		for(let i=1; i<=number; i++){
			numberArray.push(i)
		}
		return numberArray
	}

	function toggleAction(newAction: buyOrRent): void {
		action.value = newAction
	}
	
	function addOptionalParams(params: FetchPropertiesForSaleParams) {
		if (userInput.selected_sqft_max) params['sqft_max'] = userInput.selected_sqft_max.toString()
		if (userInput.selected_sqft_min) params['sqft_min'] = userInput.selected_sqft_min .toString()
		if (userInput.selected_price_max) params['price_max'] = userInput.selected_price_max.toString()
		if (userInput.selected_price_min) params['price_min'] = userInput.selected_price_min.toString()
		if (userInput.selected_beds_min) params['beds_min'] = userInput.selected_beds_min.toString()
		if (userInput.selected_baths_min) params['baths_min'] = userInput.selected_baths_min.toString()
		if (userInput.selected_age_max) params['age_max'] = userInput.selected_age_max.toString()
		return params
	}

	function search() {
		let params: FetchPropertiesForSaleParams = 
		{
			city: query.value.toString(),
			state_code: userInput.selected_state.code.toString(),
			limit: '25',
			offset: '0',
			sort: 'relevance',
		}
		params = addOptionalParams(params)

		let paramsEncoded = encodeURIComponent(JSON.stringify(params))
		router.push({path:`/search?action=${action.value}`, query: {object:paramsEncoded} })
	}
	
</script>

<style lang="scss" scoped>
.container {
  display:flex;
  flex-direction: column;
  .btn-row {
	button {
		border:none;
		outline:none;
		padding:0.4rem 1.1rem;
		background:rgba(0,0,0,0.5);
		&.highlighted {
			border:2px solid red;
		}
	}
  }
  .searchBar {
		.select-state {
			border:3px solid yellow !important;
		}
	  .filters-container {
		  input {
			width:5rem;
		  }
		  select {
			width:2.5rem;
		  }
	  }
  }
}
</style>
