<template>
	<div class="property-container" v-if="property">
		<div class="card">
			<div class="card-top">
				<div class="img-container">
					<img class="radius-small" :src="currentPhoto" alt="">
				</div>
				<div class="info">
					<div>
						<h3 class="address">{{property.address.neighborhood_name}}, {{property.address.line}}, {{property.address.state}}</h3>
						<h1 class="price"> {{ isPropertyBuy(property) ? '$' +
							property.price.toLocaleString()
							: property.price?.toLocaleString()|| property.community?.price_max.toLocaleString() }}
						</h1>
					</div>
					<div class="stats">
						<p class="stat">
							<div class="icon-container">
								<span>
									<font-awesome-icon :icon="['fasl', 'shower']" />
								</span>
								{{ isPropertyBuy(property) ? property.baths 
								: property.community?.baths_max || property.baths }}
								Bathroom
							</div>
						</p>
						<p class="stat">
							<div class="icon-container">
								<span>
									<font-awesome-icon :icon="['fas', 'bed']" />
								</span>
								{{ isPropertyBuy(property) ? property.beds 
								: property.community?.beds_max || property.beds || property.community?.beds_min}} Bedroom
							</div>
						</p>
						<p class="stat" v-if="property.building_size?.size">
							<div class="icon-container">
								<span>
									<font-awesome-icon class="icon" :icon="['fasr', 'building']" />
								</span>
								{{property.building_size.size.toLocaleString()}} Square feet
							</div>
						</p>
					</div>
					
					<div>
						<p class="stat" v-if="property.garage">Garage: {{property.garage}}</p>
						<p class="stat">{{property.address.city}}</p>
						<p class="stat">{{property.prop_type.replace(/_/g, ' ')}}</p>
						<p class="stat">{{ isPropertyBuy(property) ?
							property.lead_forms?.local_phone || null
							: property.community?.contact_number || null }}
						</p>
						<!-- <p class="stat">{{property.prop_status.replace(/_/g, ' ')}}</p> -->
					</div>

					<div>
						<p class="info-bottom">Updated: {{property.last_update.split("T")[0].split("-").reverse().join("/")}}</p>
						<p class="info-bottom">List date: {{property.list_date.split("T")[0].split("-").reverse().join("/")}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="card-small zero-margin">
		<div v-if="property" class="photos-container">
			<div v-for="photo in property.photos" class="photo">
				<img @click="setImage(photo.href)" class="radius-small" :src="photo.href" alt="">
			</div>
		</div>

	</div>

	<div class="card-small">
		<div>
			<h1>Description</h1>
			<p>{{property.description}}</p>
		</div>
	</div>

	<div class="card-small">
		<div class="map-container">
			<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="map_url">
			</iframe>
		</div>
		<div v-if="isPropertyBuy(property)" class="agent-container">
			<p class="agent-name"> {{property.agents[0]?.name.toLowerCase()}} </p>
			<img :src="property.agents[0]?.photo?.href ?
			property.agents[0]?.photo?.href
			: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvN_Jtd4I62gZJcUNjGCs2xPLzGwJZyqEFnOPi7TX2yOnDrdOT6t_tWH5rx3cpXPA7wK8&usqp=CAU' "
			alt="">
			<p class="slogan"> {{property.agents[0]?.slogan}} </p>
			<a v-if="property.agents[0]?.href" :href="property.agents[0]?.href" target="_blank"><button class="button">View Profile</button></a>
			<p class="agent-email"> {{property.agents[0]?.email}} </p>
			<p >{{property.agents[0]?.office_name}} </p>
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
    return {property, isPropertyBuy, setImage, currentPhoto, isPropertyRent, setMapUrl, map_url,}
	}
})
</script>

<style scoped lang="scss">
h1,h2,h3 {
	text-align:left;
}
.icon-container {
	> * {
		display: inline-block;
		min-width:1.6rem;
	}
}
.card-small {
	padding:var(--padding-small);
	max-width:var(--page-width-medium);
	margin:1rem auto;
	display:flex;
	flex-wrap: wrap;
	justify-content:space-between;
	font-size:var(--font-size-small);
}
.property-container {
	max-width:var(--page-width-medium);
	display:flex;
	margin:auto;
	padding:var(--padding-small);
	.card {
		border: 1px solid #0000001c;
		border-radius:var(--border-radius-medium);
		margin:auto;
		width:60rem;
		
		.card-top {
			display:flex;
			flex-direction: row;
			@media screen and (max-width: 830px) {
				justify-content: center;
			}
			> div{
				h1,h2,h3 {
					text-align: left;
				}
			}
			.info {
				line-height:var(--line-height-medium);
				text-transform: capitalize;
				font-weight: 400;
				height:inherit;
				padding:var(--padding-small);
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.price {
					margin-bottom:0.3rem;
				}
				.stat {
					font-size: var(--font-size-smedium);
				}
				.address {
					font-size: var(--font-size-large);
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					text-overflow: ellipsis;
					max-width:28rem;
				}
				.info-bottom {
					font-weight:400;
					font-style: italic;
				}
				p {
					letter-spacing: var(--letter-spacing-medium);
				}
			}
			.img-container {
				width: 28rem;
				height: 21rem;
				border-right: 1px solid #0000001c;
				img {
					height: inherit;
					margin: auto;
					display: block;
					vertical-align: bottom;
					max-width: 100%;
				}
				@media screen and (max-width: 485px) {
					margin:auto;
					width:fit-content;
				}
			}
		}
	}
	
}
.agent-container{
	margin-right:0;
	display: flex;
    flex-direction: column;
    justify-content: center;
	flex-wrap: wrap;
	width:fit-content;
	max-width:12rem;
	height:fit-content;
	@media screen and (max-width: 930px) {
		margin:2rem auto;
	}
	.agent-name {
		font-weight: 500;
		font-size: var(--font-size-medium);
		text-transform:capitalize;
		margin-bottom:0.4rem;
		padding-top:0;
	}
	.agent-email {
		font-weight: 500;
	}
	> * {
		padding: 0.3rem 0.2rem;
		text-align: center;
		display:block;
	}
	a {
		width:fit-content;
		margin:auto;
		text-decoration:none;
	}
	img {
		margin:auto;
		width:7rem;
		height:7rem;
		object-fit: cover;
		border-radius:100%;
		vertical-align: middle;
	}
	.slogan {
		font-style:italic;
		word-wrap:break-word;
	}
	.btn-profile {
		outline:none;
		border:none;
		cursor:pointer;
	}
}

.photos-container {
	padding-bottom:0.3rem;
	padding-top:0;
	max-width:var(--page-width-medium);
	margin:0.5rem auto;
	margin-top:0;
	display:flex;
	gap:0.2rem;
	overflow-x:scroll;
	&::-webkit-scrollbar {
		background:rgb(240, 240, 240);
		border-radius:6px;
		height:0.5rem;
	  }
	 &::-webkit-scrollbar-thumb {
		background:rgba(0,0,0,0.25);
		border-radius:6px;
	  }
	  &::-webkit-scrollbar-thumb:hover {
		background:rgba(0,0,0,0.35);
	  }
	  &::-webkit-scrollbar-track-piece {
		border-radius:6px;
	  }
	.photo {
		img {
			max-width:9rem;
			max-height:5rem;
			object-fit: cover;
			cursor:pointer;
			vertical-align: bottom;
		}
	}
}
.map-container{
	width: 45rem;
	iframe {
		width:100%;
		height:100%;
		border-radius: var(--border-radius-medium);
	}
}
.zero-margin {
	margin:0 auto;
}
</style>
