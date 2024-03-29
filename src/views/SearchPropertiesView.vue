<template>
	<main>
		<div id="loader" class="loader" v-if="isLoading">
			<div class="spinner" id="spinner"></div>
			<!-- <p class="loading-text">Loading AI..</p> -->
		</div>
		<h1 class="page-h1">Search Real Estate</h1>
		<SearchBar/>
		<div class="sort-btn-container fade-in">
			<button @click="sortPriceHigh()">Price - High</button>
			<button @click="sortPriceLow()">Price - Low</button>
			<button @click="sortAlphabetical()">A-Z</button>
			<button @click="sortAlphabeticalReverse()">Z-A</button>
		</div>
		<p class="errMsg">{{errMsg}}</p>
		<h3 v-if="zeroResults" class="zeroResults">No results</h3>
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
	const isLoading = ref(false)
	const zeroResults = ref(false)

	const properties = ref(<Property[]|undefined>undefined)
	const orderedProperties = ref(<Property[]|undefined>undefined)
	
	const errMsg = ref(<string|undefined> undefined)

	function sortPriceHigh() {
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
		zeroResults.value = false
		if (!properties) {
			zeroResults.value = true
			return
		} 
		return properties.filter((property) => {
			return property.photo_count > 1
		})
	}

	async function fetchForSaleData (parameters: QueryParams) {
		let params = parameters
		let resp:Property[] = await getForSale(params);
		const respFiltered = filterEmptyPhotos(resp)
		console.log('for sale array: ', respFiltered)
		if (!respFiltered) {errMsg.value = 'API error - 204 No content'}
		properties.value = respFiltered
		orderedProperties.value = respFiltered
		isLoading.value = false
	}
	async function fetchForRentalData (parameters: QueryParams) {
		let params = parameters
		let resp:Property[] = await getForRental(params);
		const respFiltered = filterEmptyPhotos(resp)
		console.log('for rent array: ', respFiltered)
		if (!respFiltered) {errMsg.value = '204 No content'}
		properties.value = respFiltered
		orderedProperties.value = respFiltered
		isLoading.value = false
	}
	function handleErrMsg (paramsObject: QueryParams) {
		if (paramsObject.price_max) {
				errMsg.value = 'MAX_PRICE filter is sometimes inaccurate for rental_properties'
			} else {
				errMsg.value = undefined
			}
	}

	function search () {
		isLoading.value = true
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
			if (decoded === 'undefined') {
			isLoading.value = false
				return
			}
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
		border-bottom:1px solid rgba(0, 0, 0, 0.05);
		min-height:80vh;
		padding: var(--page-padding-top) 1.7vw;
		max-width: 120rem;
		margin:auto;
		background: var(--color-background-light);
		@media screen and (max-width: 500px) {
			padding-top:var(--page-padding-top-mobile);
		}
		.page-h1 {
			margin-bottom:5rem;
		}
		.errMsg {
			color:red;
			text-align: center;
		}
		.zeroResults {
			text-align: center;
		}
		.list-move {
			transition: all 1s;
		}
		.sort-btn-container {
			margin:auto;
			margin-top:2.5rem;
			margin-bottom:3.5rem;
			display: flex;
			gap:0.5rem;
			width:fit-content;
			button {
				border-radius: var(--border-radius-small);
				outline:none;
				border:none;
				background:var(--color-primary);
				padding:0.7rem;
				min-width:8rem;
				font-size: var(--font-size-xxsmall);
				font-weight: 500;
				&:hover {
					background:var(--color-primary-hover);
				}
				@media screen and (max-width: 630px) {
					min-width:6.5rem;
					margin-bottom:2rem;
				  }
				  @media screen and (max-width: 530px) {
					min-width:5.6rem;
				  }
				  @media screen and (max-width: 415px) {
					min-width:4.6rem;
				  }
			}
		}
		ul {
			display:inline-flex;
			flex-wrap: wrap;
			justify-content:center;
			gap:2rem;
			li {
				display:inline-flex;
			}
		}
		.loader {
			visibility: visible;
			display:flex;
			position:absolute;
			flex-direction:column;
			height:100%;
			width:100%;
			background:rgba(255, 255, 255, 0.3);
			z-index:100;
		  }
		  .spinner {
			 visibility: visible;
			 position:absolute;
			 top: 40%;
			 left:50%;
			 margin-left:-38px;
			 height:80px;
			 width:80px;
			 -webkit-animation: rotation 0.5s infinite linear;
			 -moz-animation: rotation 0.5s infinite linear;
			 -o-animation: rotation 0.5s infinite linear;
			 animation: rotation 0.5s infinite linear;
			 border:8px solid rgba(179, 179, 179, 0.3);
			 border-top:8px solid var(--color-primary);
			 border-radius:100%;
		  }
		  @-webkit-keyframes rotation {
			from {-webkit-transform: rotate(0deg);}
			to {-webkit-transform: rotate(359deg);}
		 }
		 @-moz-keyframes rotation {
			from {-moz-transform: rotate(0deg);}
			to {-moz-transform: rotate(359deg);}
		 }
		 @-o-keyframes rotation {
			from {-o-transform: rotate(0deg);}
			to {-o-transform: rotate(359deg);}
		 }
		 @keyframes rotation {
			from {transform: rotate(0deg);}
			to {transform: rotate(359deg);}
		 }
	}

</style>