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
import {onMounted, ref, watch } from 'vue';
import PropertyComp from '@/components/property/Property.vue';
import SearchBar from '@/components/SearchBar.vue'
import { getForRental, getForSale } from '@/api/apis';
import type { queryParams } from '@/types/property/FetchProperty.type';
import { useStore } from '@/store/store';
	
	const store = useStore()
	const properties = ref(<Property[]|undefined>undefined)
	const orderedProperties = ref(<Property[]|undefined>undefined)
	
	function sortPriceHigh() {
		if (!orderedProperties.value) return
		const sortBy = 'price'
		orderedProperties.value = [...orderedProperties.value].sort((a: Property, b: Property) => {
			return a[sortBy] < b[sortBy] ? +1 : -1;
		})
	}
	function sortPriceLow() {
		if (!orderedProperties.value) return
		const sortBy = 'price'
		orderedProperties.value = [...orderedProperties.value].sort((a: Property, b: Property) => {
			return a[sortBy] > b[sortBy] ? +1 : -1;
		})
	}
	function sortAlphabetical() {
		if (!orderedProperties.value) return
		const filteredList = orderedProperties.value.filter(property => property['address']['neighborhood_name'] !== undefined)
		orderedProperties.value = filteredList.sort((a: Property, b: Property) =>
			a['address']['neighborhood_name'] && b['address']['neighborhood_name'] // check if these exist
				? a['address']['neighborhood_name'].localeCompare(b['address']['neighborhood_name'])
				: 0
		)
	}

	// trigger new search when user click 'search' btn which updates store
	watch(() => store.getParamsEncoded, (newVal) => {
		search()
	})

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
		orderedProperties.value = resp
	}

	function search () {
		try {
			properties.value = undefined
			orderedProperties.value = undefined
			const paramsEncoded = store.getParamsEncoded
			const paramsDecoded = decodeURIComponent(paramsEncoded)
			const paramsObject = JSON.parse(paramsDecoded)
			if (paramsObject.buyOrRent === 'buy') fetchForSaleData(paramsObject)
			else if (paramsObject.buyOrRent === 'rent') fetchForRentalData(paramsObject)
		}
		catch {}
	}

	onMounted(() => {
		search()
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