<template>
	<router-link :to="viewPropertyDetailed" class="container">

		<div class="property-container radius-medium">
			<div class="img-container">
				<img class="radius-small" :src="isPropertyRent(property) ? property.photos[0].href : property.thumbnail" alt="">
			  </div>
			  <div class="info">
				<p class="price"> {{ isPropertyBuy(property) ? '$' +
					property.price.toLocaleString()
					: property.price || property.community?.price_max.toLocaleString() }}
				</p>
				<p>{{property.address.neighborhood_name}}, {{property.address.line}}</p>
				<div class="stats">
					<p>{{ isPropertyBuy(property) ?
						property.baths 
						: property.community?.baths_max || property.baths || property.community.baths }}
						bathroom
					</p>
					<p >{{ isPropertyBuy(property) ?
						property.beds 
						: property.community?.beds_max || property.beds || property.community?.beds_min}} bedroom
					</p>
				  <p v-if="property.building_size?.size">{{property.building_size.size}} sqfeet</p>
				</div>
				<p>{{property.address.city}}</p>
				<p>{{property.prop_type.replace(/_/g, ' ')}}</p>
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
		setup (props) {
			const routeUrl = '/view_property?id='
			const id = props.property.property_id
			const viewPropertyDetailed = routeUrl + id
			function isPropertyBuy(property: Property): property is PropertyBuy {
				return property.prop_status === "for_sale";
			}
			function isPropertyRent(property: Property): property is PropertyRent {
				return property.prop_status === "for_rent";
			}
			
			return {viewPropertyDetailed, isPropertyBuy, isPropertyRent}
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
	width: 23rem;
	height:23rem;
	list-style-type: none;
	overflow:hidden;
	margin:1.5rem 1rem;
	background: var(--background-color);
	.info {
		padding:0.5rem;
		.price {
			font-size:1.5rem;
		}
		.stats {
			display:flex;
			gap:3rem;
		}
	}

	.img-container {
		height:16rem;
		display:flex;
		justify-content: center;
		img {
			max-width:100%;
			max-height:100%;
		}
	}
}

</style>