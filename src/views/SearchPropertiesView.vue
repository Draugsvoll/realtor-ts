<template>
	<main>
		<SearchBar/>
		<div class="sort-btn-container">
			<button @click="sortPriceHigh()">Price high</button>
			<button @click="sortPriceLow()">Price Low</button>
			<button @click="sortAlphabetical()">A-Z</button>
			<button @click="sortAlphabeticalReverse()">Z-A</button>
		</div>
		<p class="errMsg">{{errMsg}}</p>
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
import type { QueryParams } from '@/types/property/FetchProperty.type';
import { useStore } from '@/store/store';
import { useRoute } from 'vue-router';
import type { PropertyBuy } from '@/types/property/PropertyBuy.type';
import type { PropertyRent } from '@/types/property/PropertyRent.type';
	
	const route = useRoute()
	const store = useStore()

	const properties = ref(<Property[]|undefined>undefined)
	const orderedProperties = ref(<Property[]|undefined>undefined)
	
	const errMsg = ref(<string|undefined> undefined)

	function sortPriceHigh() {
		if (!orderedProperties.value) return
		const price = 'price'
		orderedProperties.value = [...orderedProperties.value].sort((a: Property, b: Property) => {
			let priceA = 0
			let priceB = 0
			if (isPropertyBuy(a) && isPropertyRent(b)) {
				priceA = a[price]
				priceB = b[price]
			}
			else if (isPropertyRent(a) && isPropertyRent(b)){
				priceA = a[price] ? a[price] : a['community']['price_max']
				priceB = b[price] ? b[price] : b['community']['price_max']
			}
			return priceA < priceB ? +1 : -1;
		})
	}
	function sortPriceLow() {
		if (!orderedProperties.value) return
		const price = 'price'
		orderedProperties.value = [...orderedProperties.value].sort((a: Property, b: Property) => {
			let priceA = 0
			let priceB = 0
			if (isPropertyBuy(a) && isPropertyBuy(b)) {
				priceA = a[price]
				priceB = b[price]
			}
			else if (isPropertyRent(a) && isPropertyRent(b)){
				priceA = a[price] ? a[price] : a['community']['price_max']
				priceB = b[price] ? b[price] : b['community']['price_max']
			}
			return priceA > priceB ? +1 : -1;
		})
	}
	function sortAlphabetical() {
		if (!orderedProperties.value) return
		const filteredList = orderedProperties.value.filter(property => property['address']['neighborhood_name'] !== undefined)
		orderedProperties.value = filteredList.sort((a: Property, b: Property) =>
			a['address']['neighborhood_name'] && b['address']['neighborhood_name']
				? a['address']['neighborhood_name'].localeCompare(b['address']['neighborhood_name'])
				: 0
		)
	}
	function sortAlphabeticalReverse() {
		if (!orderedProperties.value) return
		const filteredList = orderedProperties.value.filter(property => property['address']['neighborhood_name'] !== undefined)
		orderedProperties.value = filteredList.sort((a: Property, b: Property) =>
			a['address']['neighborhood_name'] && b['address']['neighborhood_name']
				? b['address']['neighborhood_name'].localeCompare(a['address']['neighborhood_name'])
				: 0
		)
	}

	function isPropertyBuy(property: Property): property is PropertyBuy {
				return property.prop_status === "for_sale";
	}
	function isPropertyRent(property: Property): property is PropertyRent {
		return property.prop_status === "for_rent";
	}

	watch(() => store.getParamsEncoded, (newVal) => {
		if (newVal === '') {
			properties.value = undefined
			orderedProperties.value = undefined
			return
		}
		search()
	})

	function filterEmptyPhotos(properties: Property[]) {
		return properties.filter((property) => {
			return property.photo_count > 1
		})
	}

	async function fetchForSaleData (parameters: QueryParams) {
		let params = parameters
		let resp:Property[] = await getForSale(params);
		const respFiltered = filterEmptyPhotos(resp)
		console.log('for sale array: ', respFiltered)
		properties.value = respFiltered
		orderedProperties.value = respFiltered
	}
	async function fetchForRentalData (parameters: QueryParams) {
		let params = parameters
		let resp:Property[] = await getForRental(params);
		const respFiltered = filterEmptyPhotos(resp)
		console.log('for rent array: ', respFiltered)
		properties.value = respFiltered
		orderedProperties.value = respFiltered
	}
	function handleErrMsg (paramsObject: QueryParams) {
		if (paramsObject.price_max) {
				errMsg.value = 'MAX_PRICE is sometimes inaccurate for rental_properties'
			} else {
				errMsg.value = undefined
			}
	}

	function search () {
		properties.value = undefined
		orderedProperties.value = undefined
		const paramsEncoded = store.getParamsEncoded
		let paramsObject: QueryParams|undefined = undefined
		
		// use try-catch to avoid hang-up in-case decoding URIcomp goes wrong
		try {
			// Execute search when user clicked on search-btn (params were updated in Store)
			const paramsDecoded = decodeURIComponent(paramsEncoded)
			paramsObject = JSON.parse(paramsDecoded)
		}
		catch {
			// Execute search from URL (e.g we open a link, didnt search ourselves)
			let encoded: any = route.query.object
			let decoded: any = decodeURIComponent(encoded)
			if (decoded === 'undefined') {return}
			else {paramsObject = JSON.parse(decoded)}
		}
		if (paramsObject && paramsObject.buyOrRent === 'buy') {
			fetchForSaleData(paramsObject)
		} 
		else if (paramsObject && paramsObject.buyOrRent === 'rent'){
			fetchForRentalData(paramsObject)
			handleErrMsg(paramsObject)
		}
	}

	onMounted(() => {
		search()
	})
</script>

<style scoped lang="scss">
	main {
		padding-top:5rem;
		.errMsg {
			color:red;
		}
		.list-move {
			transition: all 1s;
		}
		.sort-btn-container {
			margin:auto;
			width:fit-content;
			button {
				outline:none;
				border:none;
				background:var(--color-primary);
				padding:1rem;
			}
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