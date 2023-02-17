<template>
	<router-link :to="url" class="container">

		<!-- BUY PROPERTY -->
		<div class="property-container" v-if="isPropertyBuy(property)">
			<div class="img-container">
				<img :src="property.thumbnail" alt="">
			</div>
			<div class="info">
				<p class="price">${{property.price.toLocaleString()}}</p>
				<p>{{property.address.neighborhood_name}}, {{property.address.line}}</p>
				<div class="stats">
					<p>{{property.baths}} baths</p>
					<p>{{property.beds}} beds</p>
					<p v-if="property.building_size">{{property.building_size.size}} sqft</p>
				</div>
				<p>{{property.address.city}}</p>
				<p>{{property.property_id}}</p>
			</div>
		</div>

		<!-- RENTAL -->
		<div class="property-container" v-if="isPropertyRent(property)">
			<div class="img-container">
				<img :src="property.photos[0].href" alt="">
			</div>
			<div class="info">
				<p class="price">${{property?.community?.price_min || property.price}} /month</p>
				<p>{{property.address.neighborhood_name}}, {{property.address.line}}</p>
				<div class="stats">
					<p>{{property?.community?.baths_min || property.baths}} baths</p>
					<p>{{property.beds || property.community.beds_max}} beds</p>
					<!-- <p v-if="property.building_size">{{property.building_size.size}} sqft</p> -->
				</div>
				<p>{{property.address.city}}</p>
				<p>{{property.property_id}}</p>
			</div>
		</div>

	</router-link>
</template>

<script lang="ts">
	import type { Property } from '@/types/property/Property.type';
	import type { PropertyBuy } from '@/types/property/PropertyBuy.type';
	import type { PropertyRent } from '@/types/property/PropertyRent.type';
	import { defineComponent, type PropType } from 'vue';

	export default defineComponent({
		props: {
			property: {
				required: true,
				type: Object as PropType<Property>
				},
		},
		methods: {
			isPropertyBuy(property: Property): property is PropertyBuy {
				return property.prop_status === "for_sale";
			},
			isPropertyRent(property: Property): property is PropertyRent {
				return property.prop_status === "for_rent";
			},
		},
		setup (props) {
			const routeUrl = '/view_property?id='
			const id = props.property.property_id
			const url = routeUrl + id
			
			return {url}
		},
	})
</script>


<style scoped lang="scss">
a {
	color: inherit;
	text-decoration: none;
}
.property-container {
	cursor: pointer;
	width: 350px;
	height:400px;
	list-style-type: none;
	border-radius:10px;
	overflow:hidden;
	margin:1.5rem 1rem;
	background: rgb(54, 55, 56);
	.info {
		.price {
			font-size:1.5rem;
		}
		.stats {
			display:flex;
			gap:3rem;
		}
	}

	.img-container {
		height:250px;
		display:flex;
		justify-content: center;
		img {
			max-width:100%;
			max-height:100%;
			border-radius:5px;
		}
	}
}

</style>