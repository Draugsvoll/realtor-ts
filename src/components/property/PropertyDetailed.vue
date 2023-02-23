<template>
	<div class="property-container" v-if="property && isPropertyBuy(property)">
		<div class="card test">
			<div class="img-container">
				<!-- <img v-if="property" class="radius-small" :src="currentPhoto" alt=""> -->
			</div>
			<div v-if="property" class="photos-container">
				<div v-for="photo in property.photos" class="photo">
					<!-- <img @click="setImage(photo.href)" class="radius-small" :src="photo.href" alt=""> -->
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
</template>

<script lang="ts">
import type { PropertyDetailed } from '@/types/property/detailed/PropertyDetailed.type';
import type { PropertyDetailedBuy } from '@/types/property/detailed/PropertyDetailedBuy.type';
import type { PropertyDetailedRent } from '@/types/property/detailed/PropertyDetailedRent.type';
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'test',
  props: {
    property: {
      type: Object as PropType<PropertyDetailed>,
      required: true
    }
  },
  setup(props) {

	function isPropertyBuy(property: PropertyDetailed): property is PropertyDetailedBuy {
		return property.prop_status === "for_sale";
	}
	function isPropertyRent(property: PropertyDetailed): property is PropertyDetailedRent {
		return property.prop_status === "for_rent";
	}

	const property = props.property
    return {property, isPropertyBuy}
  }
})

</script>

<style scoped lang="scss">
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
</style>