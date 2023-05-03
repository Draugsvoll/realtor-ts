<!-- eslint-disable prettier/prettier -->
<template>
	<div class="container" ref="containerRef">
		<div class="btn-row">
			<button @click="toggleBuyOrRent('buy')" :class="{ 'highlighted': buyOrRent === 'buy' }">Buy</button>
			<button @click="toggleBuyOrRent('rent')" :class="{ 'highlighted': buyOrRent === 'rent' }">Rent</button>
		</div>
		<div class="searchBar-container">
			<div class="actual-search-bar">
				<input class="main-search-inputbar radius-small" v-model="query" type="text" name="locations" placeholder="City, Address..." autofocus @keyup.enter="search()" ref="input">
				<button class="btn-search radius-small" @click="search()">
					<div class="icon-container">
						<font-awesome-icon class="icon" :icon="['fass', 'magnifying-glass']" />
					</div>
				</button>
			</div>
			<!-- <span class="state-label">State: </span> -->
			<select v-model="userInput.selected_state" class="select-state" >
				<option 
					v-for="state in states" 
					:value="state">
					{{state.name}}
				</option>
			</select>
		</div>
		<div class="filters-container">
			<div>
				<div class="filter">
					<p>beds min</p>
					<select v-model="userInput.selected_beds_min">
						<option 
							v-for="bed in beds_min_options"
							:value="bed"
							>{{bed}}
						</option>
					</select>
				</div>
				<div class="filter">
					<p>baths min</p>
					<select v-model="userInput.selected_baths_min">
						<option 
						v-for="bath in baths_min_options"
						:value="bath"
						>{{bath}}
					</option>
					</select>
				</div>
				<div class="filter">
					<p>sqfeet min</p>
					<input v-model="userInput.selected_sqft_min" type="number" min="1" step="1">
				</div>
				
				<div class="filter">
					<p>sqfeet max</p>
					<input v-model="userInput.selected_sqft_max" type="number" min="1" step="1">
				</div>
	
				<div class="filter">
					<p>price min</p>
					<input v-model="userInput.selected_price_min" type="number" min="1" step="1">
				</div>
	
				<div class="filter">
					<p>price max</p>
					<input v-model="userInput.selected_price_max" type="number" min="1" step="1" placeholder="">
				</div>
			</div>
			<div>
				<!-- <div class="filter">
					<p>max age (years)</p>
					<select v-model="userInput.selected_age_max">
						<option 
							v-for="age in age_max_options"
							:value="age"
							>{{age}}
						</option>
					</select>
				</div> -->
				
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref } from 'vue'
import {useStore} from '@/store/store'
import {useRoute, useRouter} from 'vue-router'
import type {QueryParams} from '@/types/property/FetchProperty.type'
import type {BuyOrRent} from '@/types/property/Property.type'

const router = useRouter()
const route = useRoute()
const query = ref(<string>'')
const store = useStore()
const containerRef = ref(<HTMLElement | null>null)

// user wants to buy or rent
const buyOrRent = ref(<BuyOrRent>'buy')

// user input options
const baths_min_options = ref(<number[]>generateNumberArray(5))
const beds_min_options = ref(<number[]>generateNumberArray(5))
const age_max_options = ref(<number[]>generateNumberArray(50))

type state = {name: string, code: string}
const states: state[] = [
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
	
	function insertOptionalParams(params: QueryParams) {
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

	function search() {
		let params: QueryParams = 
		{
			city: query.value.toString(),
			state_code: userInput.selected_state.code.toString(),
			limit: '50',
			offset: '0',
			sort: 'relevance',
			buyOrRent: buyOrRent.value
		}
		params = insertOptionalParams(params)
		if (encodeURIComponent(JSON.stringify(params)) === store.getParamsEncoded) {
			params.limit = '51' // Trigger a search even if QueryParams didnt change
		}
		const QueryParamsEncoded = encodeURIComponent(JSON.stringify(params))
		store.setParamsEncoded(QueryParamsEncoded)
		router.push({path:`/search?`, query: {object:QueryParamsEncoded} }) // update url (goes to search-page if not already there & URL is shareable link)
	}

	function persistUserInput() {
		const decodedParams = decodeURIComponent(store.getParamsEncoded)
		const params = JSON.parse(decodedParams)

		// reset dummy parameters that was inserted due to avoid API bugging sometimes
		if (params.sqft_min === '1') params.sqft_min = undefined
		if (params.price_min === '1') params.price_min = undefined
		if (params.baths_min === '1') params.baths_min = undefined
		if (params.beds_min === '1') params.beds_min = undefined

		// insert values from userInput
		if (params.baths_min) userInput.selected_baths_min = params.baths_min
		if (params.beds_min) userInput.selected_beds_min = params.beds_min
		if (params.age_max) userInput.selected_age_max = params.age_max
		if (params.sqft_min) userInput.selected_sqft_min = params.sqft_min
		if (params.sqft_max) userInput.selected_sqft_max = params.sqft_max
		if (params.price_min) userInput.selected_price_min = params.price_min
		if (params.price_max) userInput.selected_price_max = params.price_max
		if (params.buyOrRent) buyOrRent.value = params.buyOrRent
		if (params.city) query.value = params.city
		if (params.state_code) {
			const stateIndex = states.findIndex(state => state.code === params.state_code)
			userInput.selected_state = states[stateIndex]
		}
	}

	onMounted(() => {
		if (route.path !== '/') {
			try { persistUserInput() } // fetching params from searchEvent/URL
			catch {}	// skip trying to persist filters if something went wrong
			const container = containerRef.value
			if (container) {
				container.classList.add('style-not-transparent')
			}
		}
	})
</script>

<style lang="scss" scoped>

.container {
	--main-input-height:2.7rem;
	--background-color: rgba(0,0,0,0.42);
	--background-color-hover: rgba(0,0,0,0.55);
	position:relative;
	display:flex;
	flex-direction: column;
	margin-left:auto;
	margin-right:auto;
	width:fit-content;
	.btn-row {
		button {
			cursor:pointer;
			display: inline-block;
			margin:0;
			margin-right:0.1rem;
			border-radius:0px;
			border-top-right-radius: var(--border-radius-small);
			border-top-left-radius: var(--border-radius-small);
			border:none;
			outline:none;
			padding:0.6rem 1.8rem;
			font-size: var(--font-size-xsmall);
			background:var(--background-color);
			border-bottom: 2px solid rgba(255, 255, 255, 0.05);
			color:rgba(255, 255, 255, 0.777);
			@media screen and (max-width: 630px) {
				min-width:5rem;
				width:7.5rem;
			}
			&.highlighted {
				border-bottom:2px solid var(--color-primary);
				color:var(--color-white);
				background:var(--background-color-hover);
			}
			&:hover{
				color:rgb(255, 255, 255);
				background:var(--background-color-hover);
			}
		}
	}
	.searchBar-container {
		position: relative;
		margin-top:0.1rem;
		display:flex;
		gap:0.3rem;
		.actual-search-bar {
			position: relative;
		}

		.main-search-inputbar {
			font-family: sans-serif;
			height:var(--main-input-height);
			width:26rem;
			font-size:var(--font-size-small);
			outline:none;
			@media screen and (max-width: 630px) {
				width:20rem;
			}
			@media screen and (max-width: 530px) {
				width:15rem;
			}
		}
		.select-state {
			height:var(--main-input-height);
			width:7.5rem;
			font-size:var(--font-size-xsmall);
			padding-left:0.1rem;
		}
		.select-state > select {
			border:2px solid var(--color-primary);
			font-size: var(--font-size-xsmall);
			width:7rem;
		}
		.btn-search {
			display: flex;
			justify-content: center;
			align-content: center;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right:0.09rem;
			margin:0;
			background:var(--color-primary);
			outline:none;
			border:none;
			height:91%;
			cursor: pointer;
			min-width:1.5rem;
			width:2rem !important;
			max-width:2rem !important;
			&:hover {
				background:var(--color-primary-hover);
			}
			.icon-container {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		.state-label {
			font-size: var(--font-size-xsmall);
		}
	}
	.filters-container {
		text-transform: capitalize;
		color:white;
		background:var(--background-color);
		display:flex;
		flex-direction: column;
		padding-top:1rem;
		margin-top:0rem;
		@media screen and (max-width: 630px) {
			display:none;
		}
		div {
			justify-content: space-between;
			display:flex;
		}
		
		.filter{
			display:flex;
			flex-direction: column;
			p {
				font-size: var(--font-size-xxsmall);
				font-weight: 400;
				letter-spacing: var(--letter-spacing-medium);
				margin-bottom: 0.1rem;
			}
			input, select {
				height:1.7rem;
				width:5.2rem;
				text-align: center;
			}
			select {
				width:4rem;
			}
		}
	}
}
.style-not-transparent  {
	input, select {
		border:1px solid rgba(128, 128, 128, 0.52) !important;
		&:hover {
			border:1px solid var(--color-primary) !important;
		}
	}
	.btn-row {
		button {
			background: var(--background-color-hover) !important;
			border-bottom: 3px solid transparent !important;
			background: rgb(102, 102, 106) !important;
			&:hover {
				border-bottom:3px solid var(--color-primary) !important;
				background: rgb(85, 87, 93) !important;
			}
			&.highlighted {
				background: rgb(85, 87, 93) !important;
				border-bottom:3px solid var(--color-primary) !important;
			}
		}
	}
	.filters-container {
		color:var(--color-font-dark) !important;
		background:transparent !important;
	}
}
</style>
