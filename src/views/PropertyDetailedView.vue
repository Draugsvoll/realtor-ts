<template>
	<main>
		
		<PropertyDetailedComp v-if="property" :property="property" />
		<div class="map-container">
			<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="map_url">
			</iframe>
			<!-- <br /><small><a href="https://www.openstreetmap.org/?mlat=40.631&amp;mlon=-75.344#map=7/40.631/-75.344">Display full map</a></small> -->
		</div>
		<div v-if="property?.prop_status === 'for_sale'" class="mortgage-container">
			<!-- form -->
			<div class="input-data">
				<form >
					<h1>Mortgage calculator</h1>
					<!-- <span>downpayment:</span><input v-model="mortgageInputs.downpayment" type="decimal"> -->
					<span class="calculator-price">Price <input class="price-input" v-model="property.price" type="number"></span>
					
					<span>Tax Rate (%) {{ Number(mortgageInputs.tax_rate).toFixed(1) }} </span><input class="range"  v-model="mortgageInputs.tax_rate" type="range" min="0" max="10" step="0.1">
					<span> Monthly Insurance {{mortgageInputs.hoi}} </span><input class="range"  v-model="mortgageInputs.hoi" type="range" min="0" max="1000">
					<span> term (years) {{ mortgageInputs.term }}:</span><input class="range"  v-model="mortgageInputs.term" type="range" min="1" max="30">
					<span>downpayment {{ mortgageInputs.downpayment }}</span><input class="range" v-model="mortgageInputs.downpayment" type="range" min="1000" :max="property.price">
				</form>
				<button @click="calculateMortgage">Calculate</button>
			</div>
			<!-- output -->
			<div class="output-data" v-if="calculatedMortgage">
				<span class="output-header">Output</span>
				<!-- <span class="span">Monthly property tax: </span> ${{ calculatedMortgage.monthly_property_taxes }} -->
				<!-- <span class="span">Principal and interest: </span> ${{ calculatedMortgage. }} principal and interest -->
				<span class="span">Monthly Payment: </span> ${{ calculatedMortgage.monthly_payment }}
				<!-- <span class="span">downpayment: </span> ${{ calculatedMortgage.downpayment }} -->
				<span class="span">Total payment: </span> ${{ calculatedMortgage.total_payment }}
			</div>
		</div>

</main>
</template>

<script setup lang="ts">
import { calculateMortgageApi, getPropertyDetails, getSimilarProperties } from '@/api/apis';
import { onMounted, reactive, ref, toRaw } from 'vue';
import type { PropertyDetailed } from '@/types/property/detailed/PropertyDetailed.type'
import type { MortgageStats, MortgageParams } from '@/types/mortgage/Mortgage.type';
import PropertyDetailedComp from '@/components/property/PropertyDetailed.vue';
import {useRoute} from 'vue-router'

	const property = ref(<PropertyDetailed|undefined>undefined)
	const currentPhoto = ref(<string|undefined> undefined)
	const route = useRoute()
	const map_url = ref(<string>'')
	const calculatedMortgage = ref(<MortgageStats|undefined>undefined)
	//   const similarProperties = ref()

	const mortgageInputs: MortgageParams = reactive({
		hoi: '100', // monhly home insurances
		tax_rate: '1.8', // property tax rate
		downpayment: '5000',
		price: property?.value?.price?.toString() || '10000',
		term: '25', // loan duration years
		rate: '1.2', // interest rate
	})

	const fetchProperty = async (id: string) => {
		let resp = await getPropertyDetails(id)
		property.value = resp.properties[0]
		if (property.value?.price){
			mortgageInputs.price = property.value?.price?.toString()
		}
		console.error('1234 propery', resp.properties[0] )
		try {currentPhoto.value = property.value?.photos[0].href}
		catch {alert('Property lacking photos')}
		setMapUrl()
		// fetchSimilarProperties()
	}

	function setMapUrl() {
		if (property.value) {
			let lat = property.value.address.lat
			let lon = property.value.address.lon
			let latInt = Math.ceil(lat)
			let lonInt = Math.ceil(lon)
			map_url.value = `https://www.openstreetmap.org/export/embed.html?bbox=${lonInt - 2}.87893676757814%2C${latInt - 2}.52307880890422%2C${lonInt}.59353637695314%2C${latInt}.32302363048832&layer=mapnik&amp&marker=${lat}%2C${lon}`;
		}
		else {
			alert('error fetching map data')
		}
	}

	async function calculateMortgage() {
		calculatedMortgage.value = await calculateMortgageApi(toRaw(mortgageInputs))
	}

	// async function fetchSimilarProperties() {
		// console.log('similar properies: ', await getSimilarProperties(property.value.property_id, property.value.prop_status))
		// similarProperties.value = await getSimilarProperties(property.value.property_id, property.value.prop_status)
	// }

	onMounted(() => {
		const property_id = route.query.id as string || ''
		fetchProperty(property_id)
	})

</script>




<style scoped lang="scss">
main {
	padding-top:5rem;

	.map-container {
		max-width:50rem;
		width:30rem;
		margin:0 auto 0 auto;
		iframe {
			width:100%;
			height:100%;
		}
	}
	
	.mortgage-container {
		border: 1px solid grey;
		padding: 1.8rem;
		display: flex;
		margin: 0px auto;
		justify-content: center;

		.input-data {
			form {
				displaY: flex;
				flex-direction: column;
				margin: auto;
				input {
					margin-bottom: 1rem;
					margin-left: 0rem;
				}
			}
			button {
			}
		}
		.output-data {
			display: flex;
			flex-direction: column;
			text-align: end;
			.output-header {
				font-weight: bold;
				text-align: right !important;
				margin: 0 auto;
				margin-bottom: 18rem;
			}
			.span {
				width: 15rem;
				margin-top: 1rem;
				text-align: right;
			}
		}


	}

	.calculator-price{
		width:fit-content;
		margin: 1rem auto;
		font-size:1.5rem;
		.price-input {
			color:var(--font-color);
			font-size: inherit;
			border:none;
			padding:0.3rem 0.5rem;
			width:9rem;
			text-align: center;
		}
	}
}</style>