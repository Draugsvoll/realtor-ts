<template>
	<div class="property-container" v-if="property">
		<div class="card">
		  <div class="img-container">
			<img class="radius-small" :src="currentPhoto" alt="">
		  </div>
		  <div v-if="property" class="photos-container">
			<div v-for="photo in property.photos" class="photo">
				<img @click="setImage(photo.href)" class="radius-small" :src="photo.href" alt="">
			</div>
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
			<p>{{property.prop_type.replace(/_/g, ' ')}}</p>
			<p>{{ isPropertyBuy(property) ?
				property.lead_forms?.local_phone || null
				: property.community?.contact_number || null }}
			</p>
			<p>{{property.prop_status.replace(/_/g, ' ')}}</p>
			<p>{{property.description}}</p>
			<p  v-for="(features, index) in property.features" :key="index">
				<p v-if="index<5" v-for="(feature, fIndex) in features.text" :key="fIndex">
					<p v-if="fIndex<10">{{ feature }}</p>
				</p>
			</p>

			<p>Updated at {{property.last_update.split("T")[0].split("-").reverse().join("/")}}</p>
			<p>Garage: {{property.garage}}</p>
			<p>List date: {{property.list_date.split("T")[0].split("-").reverse().join("/")}}</p>
		  </div>
		</div>
		<div class="map-container">
			<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="map_url">
			</iframe>
			<br /><small><a href="https://www.openstreetmap.org/?mlat=40.631&amp;mlon=-75.344#map=7/40.631/-75.344">Display full map</a></small>
		</div>
	  </div>
	  
</template>

<script lang="ts">
import type { PropertyDetailed } from '@/types/property/detailed/PropertyDetailed.type';
import type { PropertyDetailedBuy } from '@/types/property/detailed/PropertyDetailedBuy.type';
import type { PropertyDetailedRent } from '@/types/property/detailed/PropertyDetailedRent.type';
import { defineComponent, onMounted, ref, type PropType } from 'vue'

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
	const map_url = ref(<string>'')
	
	function setImage(url: string) {
		currentPhoto.value = url
	}
	function isPropertyBuy(property: PropertyDetailed): property is PropertyDetailedBuy {
		return property.prop_status === "for_sale";
	}
	function isPropertyRent(property: PropertyDetailed): property is PropertyDetailedRent {
		return property.prop_status === "for_rent";
	}
	function setMapUrl() {
		if (property) {
			let lat = property.address.lat
			let lon = property.address.lon
			let latInt = Math.ceil(lat)
			let lonInt = Math.ceil(lon)
			map_url.value = `https://www.openstreetmap.org/export/embed.html?bbox=${lonInt - 2}.87893676757814%2C${latInt - 2}.52307880890422%2C${lonInt}.59353637695314%2C${latInt}.32302363048832&layer=mapnik&amp&marker=${lat}%2C${lon}`;
		}
		else {
			alert('error fetching map data - cant find property')
		}
	}
	onMounted(() => {
		setMapUrl()
	})
    return {property, isPropertyBuy, setImage, currentPhoto, isPropertyRent, setMapUrl, map_url}
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
	> div {
		border: 1px solid yellow;
		min-width:30rem;
		width:50%;
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
	.map-container{
		margin-left:auto;
		margin-right:auto;
		iframe {
			width:100%;
			height:100%;
			min-height:15rem;
		}
	}
}
</style>