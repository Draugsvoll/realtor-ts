<template>
	<main>
		<SearchBar/>
		<div class="sort-btn-container">
			<button @click="sortPriceHigh()">Price high</button>
			<button @click="sortPriceLow()">Price Low</button>
			<button @click="sortAlphabetical()">A-Z</button>
		</div>
        <h1>Search Results</h1>
        <transition-group tag="ul" name="list">
            <li v-for="property in orderedProperties" :key="property.property_id" >
                <PropertyComp :property="property"></PropertyComp>
            </li>
        </transition-group>
	</main>
</template>

<script setup lang="ts">
import type { Property } from '@/types/property/Property.type';
import {onMounted, ref } from 'vue';
import PropertyComp from '@/components/property/Property.vue';
import SearchBar from '@/components/SearchBar.vue'
import { useRoute } from 'vue-router';
import { getForRental, getForSale } from '@/api/apis';
import type { queryParams } from '@/types/property/FetchProperty.type';
	
	const properties = ref(<Property[]|undefined>undefined)
	const orderedProperties = ref(<Property[]|undefined>undefined)
	const route = useRoute()
	
	function sortPriceHigh() {
		const sortBy = 'price'
		orderedProperties.value = [...orderedProperties.value].sort((a: Property, b: Property) => {
			return a[sortBy] < b[sortBy] ? +1 : -1;
		})
	}
	function sortPriceLow() {
		const sortBy = 'price'
		orderedProperties.value = [...orderedProperties.value].sort((a: Property, b: Property) => {
			return a[sortBy] > b[sortBy] ? +1 : -1;
		})
	}
	function sortAlphabetical() {
		const filteredList = orderedProperties.value.filter(property => property['address']['neighborhood_name'] !== undefined)
		orderedProperties.value = filteredList.sort((a: Property, b: Property) =>
			a['address']['neighborhood_name'] && b['address']['neighborhood_name'] // check if these exist
				? a['address']['neighborhood_name'].localeCompare(b['address']['neighborhood_name'])
				: 0
		)
	}

	async function fetchForSaleData (parameters: queryParams) {
		let params = parameters
		let resp:Property[] = await getForSale(params);
		console.log('for sale array: ', resp)
		properties.value = resp
		orderedProperties.value = resp
		
	}
	async function fetchForRentalData (parameters: queryParams) {
		let params = parameters
		let resp:Property[] = await getForRental(params);
		console.log('for rent array: ', resp)
		properties.value = resp
	}
	onMounted(() => {
		let params;
		if (typeof route.query.object === 'string') {
			params = JSON.parse(decodeURIComponent(route.query.object));
			if (params.buyOrRent === 'buy') fetchForSaleData(params)
			else if (params.buyOrRent === 'rent') fetchForRentalData(params)
		} else {
			alert('Error fetching user input from queryParams')
		}
	})
</script>

<style scoped lang="scss">
	main {
		padding-top:5rem;
		.list-move {
			transition: all 1s;
		}
		
		ul {
			display:inline-flex;
			flex-wrap: wrap;
			justify-content:center;
			li {
				display:inline-flex;
			}
		}
	}

</style>