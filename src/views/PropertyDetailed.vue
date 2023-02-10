<template>
	<main>
		<h1>/View_property </h1>
		<div class="property-container" v-if="property">
			<div class="img-container">
				<img :src="property.thumbnail || property.photos[0].href" alt="">
			</div>
			<div class="info">
				<p class="price">${{property.price?.toLocaleString() || property.community?.price_min?.toLocaleString()}}</p>
				<p>{{property.address.neighborhood_name}}, {{property.address.line}}</p>
				<div class="stats">
					<p>{{property.baths}} baths</p>
					<p>{{property.beds}} beds</p>
					<p v-if="property.building_size">{{property.building_size.size}} sqft</p>
				</div>
				<p>{{property.address.city}}</p>
				<p>{{property.prop_type}}</p>
				<p>Built in: {{property.year_built}}</p>

				<br>
				<p>{{property.property_id}}</p>

				<h1>{{property.address.lat}}</h1>
				<h1>{{property.address.lon}}</h1>
			</div>
		</div>

		<div class="map-container">
			<iframe 
				height="350"
				frameborder="0"
				scrolling="no"
				marginheight="0"
				marginwidth="0" 
				:src="map_url"
				style="border: 1px solid black">
			</iframe>
			<br/><small><a href="https://www.openstreetmap.org/?mlat=40.631&amp;mlon=-75.344#map=7/40.631/-75.344">Vis større kart</a></small>
		</div>

		<div class="mortgage-container">
            <!-- form -->
            <div class="form">
                <form action="">
                    <span class="input-output">Input</span>
                    <span>Monthly Insurance:</span><input v-model="hoi" type="decimal" >
                    <span>Tax Rate (%):</span><input v-model="tax"  type="decimal" >
                    <span>Downpayment:</span><input v-model="downpayment" type="decimal">
                    <span>Price $:</span><input v-model="price" type="decimal">
                    <span>Term (years):</span><input v-model="term" type="decimal" >
                    <span>Interest (%):</span><input v-model="rate" type="decimal">
                </form>
            </div>

            <!-- output -->
            <div class="output" >
                <span class="output-span">Output</span>
                <span class="span">Monthly property tax: </span> ${{ output.monthly_property_taxes }}
                <span class="span">Principal and interest: </span> ${{ output.principal_and_interest }}
                <span class="span">Monthly Payment: </span> ${{ output.monthly_payment }}
                <span class="span">Downpayment: </span> ${{ output.down_payment }}
                <span class="span">Total payment: </span> ${{ output.total_payment }}
                <button @click="calculate">Calculate</button>
            </div>

        </div>

	</main>
  </template>
  <script lang="ts">
  import { getPropertyDetails } from '@/api/apis';
	import axios from 'axios';
  import { ref } from 'vue';
  
  export default {
	setup () {
	  const property = ref()
	  const map_url = ref('')

		const hoi  = ref('300')
		const decimal =' 1.5'
		const tax  = ref('1.8')
		const downpayment = ref('30000')
		const price  = ref('400000')
		const term  = ref('25')
		const rate  = ref('1.2')
		const output = ref({})
		const similarProperties = ref([])
		const ready = ref(false)

		const VITE_RAPID_KEY:string = import.meta.env.VITE_RAPID_KEY
		const VITE_RAPID_HOST:string = import.meta.env.VITE_RAPID_HOST
		const headers = {
			'x-rapidapi-key': VITE_RAPID_KEY,
			'x-rapidapi-host': VITE_RAPID_HOST
		}

		async function fetchProperty (id: string) {
			let resp = await getPropertyDetails(id)
			property.value = resp.properties[0]
			getMapUrl()
			console.log('resp: ', property.value)
			getSimilarProperties()
		}
		
		function getMapUrl() {
			let lat = property.value.address.lat
			let lon = property.value.address.lon
			let latInt = Math.ceil(lat)
			let lonInt = Math.ceil(lon)
			map_url.value = `https://www.openstreetmap.org/export/embed.html?bbox=${lonInt-2}.87893676757814%2C${latInt-2}.52307880890422%2C${lonInt}.59353637695314%2C${latInt}.32302363048832&layer=mapnik&amp&marker=${lat}%2C${lon}`;
		}

		function calculate () {
            const options = {   
				method: 'GET',
				url: 'https://realtor.p.rapidapi.com/mortgage/calculate',
				params: {
					hoi: hoi.value,
					tax_rate: tax.value,
					downpayment: downpayment.value,
					price: price.value,
					term: term.value,
					rate: rate.value
				},
				headers: headers
			}
            axios.request(options).then(function (response) {
                console.log(response.data)
				console.error('HERE ', response.data.mortgage)
                output.value = response.data.mortgage
				ready.value = true
            }).catch(function (error) {
                console.error(error);
            });
        }

		function getSimilarProperties () {
            let similarProperties1:any = []
			const ref = this
			console.error('property: ', property.value)
			debugger 
            const options = {
                method: 'GET',
                url: 'https://realtor.p.rapidapi.com/properties/v2/list-similar-rental-homes',
                params: {postal_code: '10028', property_id: '2952212337'},
                headers: headers
                };
                axios.request(options).then(function (response) {
                    console.log('1234 similiar property: ',response);
                    response.data.properties.forEach( property => {
                        similarProperties1.push(property)
                    })
                    ref.similarProperties = similarProperties1
                }).catch(function (error) {
                    console.error('1234 ', error);
                });
        }
  
	  return { fetchProperty, map_url, property, getMapUrl, calculate, hoi, decimal, tax, downpayment, price, term, rate, output, ready, getSimilarProperties }
	},
	mounted () {
	  console.log('route: ', this.$route.query.id)
	  const property_id = this.$route.query.id as string || ''
	  this.fetchProperty(property_id)
	//   this.calculate()
	}
  };
  </script>




  <style scoped lang="scss">

  main {
	  .property-container {
		text-transform: capitalize;
		border:1px solid grey;
	  }
	  .map-container {
		width:100%;
		iframe {
			min-height:350px;
			height:33vh;
			width:100%;
		}
	  }

	  .mortgage-container {
		border:1px solid grey;
		padding: 25px;
		display: flex;
		width: 400px;
		margin: 0px auto;
		justify-content: center;

		input-output {
			font-weight: bold;
			text-align: center !important;
			margin:auto;
			margin-bottom:25px;
		}
		.output-span {
			font-weight: bold;
			text-align: right !important;
			margin:0 auto;
			margin-bottom:25px;
		}
		
		
		.numbers {
			margin:auto;
			width:10rem;
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
			width:200px;
			margin-top:1rem;
			text-align: right;
		}
		button {
			width:6.5rem;
			margin-left:auto;
			margin-top:45px;
		}
		form {
			displaY:flex;
			flex-direction: column;
			margin:auto;
		}
		input {
			width:6rem;
			margin-bottom:1rem;
			margin-left:0rem;
		}
		span {
			margin-right:auto;
		}
	  }
  }
  </style>