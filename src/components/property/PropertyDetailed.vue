<template>
	<div class="property-container" v-if="property">
		<div class="card">
			<div class="card-top">
				<div>
					<img class="radius-small" :src="currentPhoto" alt="">
				</div>
				<div class="info">
					<h3>{{property.address.neighborhood_name}}, {{property.address.line}}, {{property.address.state}}</h3>
					<h1 class="price"> {{ isPropertyBuy(property) ? '$' +
						property.price.toLocaleString()
						: property.price?.toLocaleString()|| property.community?.price_max.toLocaleString() }}
					</h1>
					<p>{{property.description}}</p>
				</div>
			</div>
			<div v-if="property" class="photos-container">
				<div v-for="photo in property.photos" class="photo">
					<img @click="setImage(photo.href)" class="radius-small" :src="photo.href" alt="">
				</div>
			</div>
		  </div>
	</div>

	<div class="card-small">
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
		

			<p>Updated at {{property.last_update.split("T")[0].split("-").reverse().join("/")}}</p>
			<p>Garage: {{property.garage}}</p>
			<p>List date: {{property.list_date.split("T")[0].split("-").reverse().join("/")}}</p>
	</div>

	<div class="card-small">
		<p  v-for="(features, index) in property.features" :key="index">
			<p v-if="index<5" v-for="(feature, fIndex) in features.text" :key="fIndex">
				<p v-if="fIndex<10">{{ feature }}</p>
			</p>
		</p>
	</div>
	
	<div v-if="isPropertyBuy(property)" class="agent-container">
		<p> {{property.agents[0]?.name}} </p>
		<img :src="property.agents[0]?.photo?.href ?
		 property.agents[0]?.photo?.href
		 : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvN_Jtd4I62gZJcUNjGCs2xPLzGwJZyqEFnOPi7TX2yOnDrdOT6t_tWH5rx3cpXPA7wK8&usqp=CAU' "
		 alt="">
		<p class="slogan"> {{property.agents[0]?.slogan}} </p>
		<a v-if="property.agents[0]?.href" :href="property.agents[0]?.href" target="_blank"><button class="btn-profile">View Profile</button></a>
		<p > {{property.agents[0]?.email}} </p>
		<p >{{property.agents[0]?.office_name}} </p>
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

.card-small {
	width:65rem;
	margin:2rem auto;
	background:var(--font-color-dark);
}
.property-container {
	display:flex;
	flex-wrap:wrap;
	margin:auto;
	.card {
		margin:auto;
		max-width:65rem;
		background:var(--font-color-dark);
		.card-top {
			min-width:30rem;
			max-width:70rem;
			display:flex;
			flex-wrap: wrap;
			gap:2rem;
			height:25rem;

			> div{
				flex:1;
				h1,h2,h3 {
					text-align: left;
				}
			}
			.info {
				border:solid;
				height:100%;
			}
			img {
				width:32rem;
				vertical-align: bottom;
				height:100%;
			}
			.map-container{
				min-width:15rem;
				flex:1;
				iframe {
					width:100%;
					height:65%;
				}
			}
		}
	}
	
}
.agent-container{
	margin:1rem auto;
	border:1px solid grey;
	width:20rem;
	padding: 3rem 0.8rem;
	display: flex;
    flex-direction: column;
    justify-content: center;
	> * {
		padding: 0.2rem;
		text-align: center;
		display:block;
	}
	a {
		width:fit-content;
		margin:auto;
	}
	img {
		margin:auto;
		width:7rem;
		height:7rem;
		object-fit: cover;
		border-radius:100%;
	}
	.slogan {
		font-style:italic;
	}
	.btn-profile {
		outline:none;
		border:none;
		padding:0.5rem 3rem;
		background:var(--color-primary);
		cursor:pointer;
	}
	
}
.photos-container {
	display: flex;
	gap: 0.5rem;
	justify-content: center;
	overflow-x:hidden;
	width:50%;		
	height:30%;
	.photo {
		img {
			max-width:7.5rem;
			max-height:4rem;
			object-fit: cover;
			cursor:pointer;
			vertical-align: bottom;
		}
	}
}
</style>