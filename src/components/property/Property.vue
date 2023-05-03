<template>
	<router-link :to="viewPropertyDetailed" class="container">

		<div class="property-container radius-medium">
			<div class="img-container">
				<img class="radius-small" :src="isPropertyRent(property) ? property.photos[0].href : property.thumbnail" alt="">
			  </div>
			  <div class="info">
				<div>
					<p class="price"> 
						$
						{{ isPropertyBuy(property) ? property.price.toLocaleString()
						: property.price || property.community?.price_max.toLocaleString() }}
					</p>
					<p class="address">{{property.address.line}}, {{property.address.neighborhood_name}}</p>
				</div>
				<div class="stats">
					<p class="stat">
						<font-awesome-icon :icon="['fasl', 'shower']" />
						{{ isPropertyBuy(property) ? property.baths 
						: property.community?.baths_max || property.baths || property.community.baths }}
						baths
					</p>
					<p class="stat">
						<font-awesome-icon :icon="['fas', 'bed']" />
						{{ isPropertyBuy(property) ? property.beds 
						: property.community?.beds_max || property.beds || property.community?.beds_min}} beds
					</p>
					<p class="stat" v-if="property.building_size?.size">
						<font-awesome-icon :icon="['fasr', 'building']" />
						{{property.building_size.size.toLocaleString()}} Square Feet
					</p>
				</div>
				<div>
					<p class="">{{property.prop_type.replace(/_/g, ' ')}}</p>
					<p class="subtle">Updated: {{property.last_update.split("T")[0]}}</p>
				</div>
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
	height:26rem;
	list-style-type: none;
	overflow:hidden;
	background: var(--color-white);
	border:1px solid rgb(216, 216, 216);
	display: flex;
	flex-direction: column;
	.info {
		flex-grow:1;
		text-transform: capitalize;
		padding:0.7rem 0.8rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.price {
			font-size:var(--font-size-large);
		}
		.address {
			font-size:var(--font-size-medium);
			line-height: 1;
		}
		.stats {
			display:flex;
			gap:1.5rem;
			.stat {
				font-size: var(--font-size-small);	
				font-weight:500;
			}
		}
		.subtle {
			font-style: oblique;
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