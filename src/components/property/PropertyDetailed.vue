<template>
	<div class="property-container" v-if="property">
		<div class="card test">
		  <div class="img-container">
			<img class="radius-small" :src="property.photos[0].href" alt="">
		  </div>
		  <div class="info">
			<p class="price"> {{ isPropertyBuy(property) ? '$' +
				property.price.toLocaleString()
				: property.price?.toLocaleString()|| property.community?.price_max.toLocaleString() }}
			</p>
			<p>{{property.address.neighborhood_name}}, {{property.address.line}}</p>
			<div class="stats">
				<p>{{ isPropertyBuy(property) ?
					property.baths 
					: property.community?.baths_max || property.baths }}
					bathroom
				</p>
				<p >{{ isPropertyBuy(property) ?
					property.beds 
					: property.community?.beds_max || property.beds || property.community?.beds_min}} bedroom
				</p>
				<p v-if="property.building_size?.size">{{property.building_size.size}} sqfeet</p>
			</div>
			<p>{{property.address.city}}</p>
			<p>{{property.property_id}}</p>
		  </div>
		</div>
	  </div>
	  
</template>

<script lang="ts">
import type { PropertyDetailed } from '@/types/property/detailed/PropertyDetailed.type';
import type { PropertyDetailedBuy } from '@/types/property/detailed/PropertyDetailedBuy.type';
import type { PropertyDetailedRent } from '@/types/property/detailed/PropertyDetailedRent.type';
import { defineComponent, ref, type PropType } from 'vue'

export default defineComponent({
  name: 'PropertyDetailed',
  props: {
    property: {
      type: Object as PropType<PropertyDetailed>,
      required: true
    }
  },
  setup(props) {
	const property = props.property
	const currentPhoto = ref(<string|undefined> property.photos[0].href)
	
	function setImage(url: string) {
		currentPhoto.value = url
	}
	function isPropertyBuy(property: PropertyDetailed): property is PropertyDetailedBuy {
		return property.prop_status === "for_sale";
	}
	function isPropertyRent(property: PropertyDetailed): property is PropertyDetailedRent {
		return property.prop_status === "for_rent";
	}
    return {property, isPropertyBuy, setImage, currentPhoto, isPropertyRent}
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