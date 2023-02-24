<template>
	<main>

		
		<PropertyDetailedComp v-if="property" :property="property" />
		<div class="property-container" v-if="property">
			<div class="card test">
				<div class="img-container">
					<img v-if="property" class="radius-small" :src="currentPhoto" alt="">
				</div>
				<div v-if="property" class="photos-container">
					<div v-for="photo in property.photos" class="photo">
						<img @click="setImage(photo.href)" class="radius-small" :src="photo.href" alt="">
					</div>
				</div>
				<div class="info">
					<p class="price">${{ property.price?.toLocaleString()}}</p>
					<p>{{ property.address.neighborhood_name }}, {{ property.address.line }}</p>
					<div class="stats">
						<p>{{ property.baths }} baths</p>
						<p>{{ property.beds }} beds</p>
						<p v-if="property.building_size">{{ property.building_size.size }} sqft</p>
					</div>
					<p>{{ property.address.city }}</p>
					<p>{{ property.prop_type }}</p>
					<p v-if="property.year_built">Built in: {{ property.year_built }}</p>
					<p>{{ property.property_id }}</p>
				</div>
			</div>
		</div>
		
		<div class="map-container test">
			<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="map_url">
			</iframe>
			<br /><small><a href="https://www.openstreetmap.org/?mlat=40.631&amp;mlon=-75.344#map=7/40.631/-75.344">Display full map</a></small>
		</div>

		<div v-if="property?.prop_status === 'for_sale'" class="mortgage-container">
			<!-- form -->
			<div class="form">
				<form action="">
					<span class="input-output">Input</span>
					<span>Monthly Insurance:</span><input v-model="mortgageInputs.hoi" type="decimal">
					<span>Tax Rate (%):</span><input v-model="mortgageInputs.tax_rate" type="decimal">
					<span>downpayment:</span><input v-model="mortgageInputs.downpayment" type="decimal">
					<span>Price $:</span><input v-model="mortgageInputs.price" type="decimal">
					<span>term (years):</span><input v-model="mortgageInputs.term" type="decimal">
					<span>Interest (%):</span><input v-model="mortgageInputs.rate" type="decimal">
				</form>
				<button @click="calculateMortgage">Calculate</button>
			</div>
			<!-- output -->
			<div class="output" v-if="calculatedMortgage">
				<span class="output-span">Output</span>
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
	const map_url = ref(<string>'')
	const currentPhoto = ref(<string|undefined> undefined)
	const route = useRoute()
	//   const similarProperties = ref()

	const calculatedMortgage = ref(<MortgageStats|undefined>undefined)

	const mortgageInputs: MortgageParams = reactive({
		hoi: '100', // monhly home insurance
		tax_rate: '1.8', // property tax rate
		downpayment: '5000',
		price: property.value?.price.toString() || '10000',
		term: '25', // loan duration years
		rate: '1.2', // interest rate
	})

	const fetchProperty = async (id: string) => {
		let resp = await getPropertyDetails(id)
		property.value = resp.properties[0]
		currentPhoto.value = property?.value?.photos[0].href
		console.log('current property: ', property.value)
		setMapUrl()
		// fetchSimilarProperties()
	}

	function setMapUrl(): void {
		if (property.value) {
			let lat = property.value.address.lat
			let lon = property.value.address.lon
			let latInt = Math.ceil(lat)
			let lonInt = Math.ceil(lon)
			map_url.value = `https://www.openstreetmap.org/export/embed.html?bbox=${lonInt - 2}.87893676757814%2C${latInt - 2}.52307880890422%2C${lonInt}.59353637695314%2C${latInt}.32302363048832&layer=mapnik&amp&marker=${lat}%2C${lon}`;
		}
		else {
			console.error('error fetching map data')
		}
	}

	async function calculateMortgage() {
		calculatedMortgage.value = await calculateMortgageApi(toRaw(mortgageInputs))
	}

	function setImage(url: string) {
		currentPhoto.value = url
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
	.property-container {
		display:flex;
		flex-wrap:wrap;
		margin:auto;
		padding-top:8rem;
		max-width:80rem;
		.test {
			width:50%;
			border:1px solid red;
		}
		.card {
			margin:auto;
			.img-container {
				margin:0.5rem auto 0.5rem auto;
				display:flex;
				justify-content: center;
				img {
					margin:auto;
					min-width:20rem;
				}
			}
			.info {
				width:100%;
			}
			.photos-container {
				display: flex;
				gap: 0.5rem;
				justify-content: center;
				overflow:hidden;
				width:100%;		
				.photo {
					img {
						flex-grow:1;
						max-width:9rem;
						max-height:6rem;
						object-fit: cover;
						cursor:pointer;
					}
				}
			}
		}
	}
	
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
		width: 30rem;
		margin: 0px auto;
		justify-content: center;

		input-output {
			font-weight: bold;
			text-align: center !important;
			margin: auto;
			margin-bottom: 18rem;
		}

		.output-span {
			font-weight: bold;
			text-align: right !important;
			margin: 0 auto;
			margin-bottom: 18rem;
		}

		.numbers {
			margin: auto;
			width: 10rem;
		}

		.number {
			display: flex;
		}

		.output {
			display: flex;
			flex-direction: column;
			text-align: end;
		}

		.span {
			width: 15rem;
			margin-top: 1rem;
			text-align: right;
		}

		button {
			width: 6.5rem;
			margin-left: auto;
			margin-top: 3rem;
		}

		form {
			displaY: flex;
			flex-direction: column;
			margin: auto;
		}

		input {
			width: 6rem;
			margin-bottom: 1rem;
			margin-left: 0rem;
		}

		span {
			margin-right: auto;
		}
	}
}</style>