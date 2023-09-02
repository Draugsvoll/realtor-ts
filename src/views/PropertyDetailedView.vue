<template>
	<main>
		<div id="loader" class="loader" v-if="!property">
			<div class="spinner" id="spinner"></div>
			<!-- <p class="loading-text">Loading AI..</p> -->
		</div>
		<PropertyDetailedComp v-if="property" :property="property" />
		<MortgageCalculator v-if="price" :price="price"></MortgageCalculator>
	</main>
</template>

<script setup lang="ts">
	import { getPropertyDetails } from '@/api/apis'
	import { onMounted, ref } from 'vue'
	import type { PropertyDetailed } from '@/types/property/detailed/PropertyDetailed.type'
	import PropertyDetailedComp from '@/components/property/PropertyDetailed.vue'
	import {useRoute} from 'vue-router'
	import MortgageCalculator from '@/components/MortgageCalculator.vue'

	const property = ref(<PropertyDetailed|undefined>undefined)
	const currentPhoto = ref(<string|undefined> undefined)
	const route = useRoute()

	const price = ref(<any>undefined)

	const fetchProperty = async (id: string) => {
		let resp = await getPropertyDetails(id)
		property.value = resp.properties[0]
		console.error('1234 propery', resp.properties[0] )
		price.value = property.value?.price
		try {
			currentPhoto.value = property.value?.photos[0].href
		}
		catch {
			alert('Property lacking photos')
		}
	}

	onMounted(() => {
		const property_id = route.query.id as string || ''
		fetchProperty(property_id)
	})
</script>




<style scoped lang="scss">
main {
	min-height:70vh;
	background: var(--color-white);
	padding:0.2rem;
	padding-top:5rem;
	padding-bottom:5rem;
	border-bottom:1px solid rgba(0, 0, 0, 0.10);
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
</style>