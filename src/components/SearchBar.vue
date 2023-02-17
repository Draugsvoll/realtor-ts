<!-- eslint-disable prettier/prettier -->
<template>
	<div class="container">
		<h1>SearchComp</h1>
		<div class="btn-row">
			<button @click="toggleBuyOrRent('buy')" :class="{ 'highlighted': buyOrRent === 'buy' }">Buy</button>
			<button @click="toggleBuyOrRent('rent')" :class="{ 'highlighted': buyOrRent === 'rent' }">Rent</button>
		</div>
		<div class="searchBar">
			<input v-model="query" type="text" placeholder="City, Adress..." autofocus @keyup.enter="search()">
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
				
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {useRouter} from 'vue-router'
import type {SearchParams} from '@/types/property/FetchProperty.type'
import type {BuyOrRent} from '@/types/property/Property.type'
	
	const router = useRouter()
    const query = ref(<string>'')

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
	const baths_min_options = ref(<number[]>generateNumberArray(5))
	const beds_min_options = ref(<number[]>generateNumberArray(5))
	const age_max_options = ref(<number[]>generateNumberArray(50))

	// inputs from user
	const userInput = reactive({
      selected_baths_min: undefined as number | undefined,
      selected_beds_min: undefined as number | undefined,
      selected_age_max: undefined as number | undefined,
      selected_state: states[31],
      selected_sqft_min: undefined as number | undefined,
      selected_sqft_max: undefined as number | undefined,
      selected_price_min: undefined as number | undefined,
      selected_price_max: undefined as number | undefined
    });

	// looking to buy or rent
	const buyOrRent = ref(<BuyOrRent>'buy')

	function generateNumberArray(number: number): number[] {
		let numberArray = []
		for(let i=1; i<=number; i++){
			numberArray.push(i)
		}
		return numberArray
	}

	function toggleBuyOrRent(BuyOrRent: BuyOrRent): void {
		buyOrRent.value = BuyOrRent
	}
	
	function addOptionalParams(params: SearchParams) {
		// fetch user inputs
		if (userInput.selected_sqft_max) params['sqft_max'] = userInput.selected_sqft_max.toString()
		if (userInput.selected_sqft_min) params['sqft_min'] = userInput.selected_sqft_min .toString()
		if (userInput.selected_price_max) params['price_max'] = userInput.selected_price_max.toString()
		if (userInput.selected_price_min) params['price_min'] = userInput.selected_price_min.toString()
		if (userInput.selected_beds_min) params['beds_min'] = userInput.selected_beds_min.toString()
		if (userInput.selected_baths_min) params['baths_min'] = userInput.selected_baths_min.toString()
		if (userInput.selected_age_max) params['age_max'] = userInput.selected_age_max.toString()

		// appearantly api bugs out sometimes, if these inputs are empty
		if (!userInput.selected_sqft_min) params['sqft_min'] = '1'
		if (!userInput.selected_price_min) params['price_min'] = '1'
		if (!userInput.selected_beds_min) params['beds_min'] = '1'
		if (!userInput.selected_baths_min) params['baths_min'] = '1'

		return params
	}

	function search():void {
		let params: SearchParams = 
		{
			city: query.value.toString(),
			state_code: userInput.selected_state.code.toString(),
			limit: '25',
			offset: '0',
			sort: 'relevance',
			buyOrRent: buyOrRent.value
		}
		params = addOptionalParams(params)

		let paramsEncoded = encodeURIComponent(JSON.stringify(params))
		router.push({path:`/search?`, query: {object:paramsEncoded} })
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
