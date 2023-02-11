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
                    <span>Tax Rate (%):</span><input v-model="tax_rate"  type="decimal" >
                    <span>Downpayment:</span><input v-model="downpayment" type="decimal">
                    <span>Price $:</span><input v-model="price" type="decimal">
                    <span>Term (years):</span><input v-model="term" type="decimal" >
                    <span>Interest (%):</span><input v-model="rate" type="decimal">
                </form>
				<button @click="calculateMortgage">Calculate</button>
            </div>

            <!-- output -->
            <div class="output" v-if="calculatedMortgage">
                <span class="output-span">Output</span>
                <span class="span">Monthly property tax: </span> ${{ calculatedMortgage.monthly_property_taxes }}
                <span class="span">Principal and interest: </span> ${{ calculatedMortgage.principal_and_interest }}
                <span class="span">Monthly Payment: </span> ${{ calculatedMortgage.monthly_payment }}
                <span class="span">Downpayment: </span> ${{ calculatedMortgage.down_payment }}
                <span class="span">Total payment: </span> ${{ calculatedMortgage.total_payment }}
            </div>

        </div>

	</main>
  </template>
  <script lang="ts">
  import { calculateMortgageApi, getPropertyDetails, getSimilarProperties } from '@/api/apis';
  import { ref } from 'vue';
  
  export default {
	setup () {
	  const property = ref()
	//   const similarProperties = ref()
	  const map_url = ref('')

		const hoi  = ref('300')
		const decimal =' 1.5'
		const tax_rate  = ref('1.8')
		const downpayment = ref('30000')
		const price  = ref('400000')
		const term  = ref('25')
		const rate  = ref('1.2')
		const calculatedMortgage = ref()

		const fetchProperty = async (id: string) => {
			let resp = await getPropertyDetails(id)
			property.value = resp.properties[0]
			console.log('current property: ', property.value)
			getMapUrl()
			// fetchSimilarProperties()
		}

		
		function getMapUrl() {
			let lat = property.value.address.lat
			let lon = property.value.address.lon
			let latInt = Math.ceil(lat)
			let lonInt = Math.ceil(lon)
			map_url.value = `https://www.openstreetmap.org/export/embed.html?bbox=${lonInt-2}.87893676757814%2C${latInt-2}.52307880890422%2C${lonInt}.59353637695314%2C${latInt}.32302363048832&layer=mapnik&amp&marker=${lat}%2C${lon}`;
		}

		async function calculateMortgage () {
            console.log('mortage resp: ', await calculateMortgageApi(hoi.value, tax_rate.value, downpayment.value, price.value, term.value, rate.value))
        }

		async function fetchSimilarProperties () {
            console.log('similar properies: ', await getSimilarProperties(property.value.property_id, property.value.prop_status))
            // similarProperties.value = await getSimilarProperties(property.value.property_id, property.value.prop_status)
        }
  
	  return { fetchProperty, map_url, property, getMapUrl, hoi, decimal, tax_rate, downpayment, price, term, rate, calculatedMortgage, calculateMortgage }
	},
	mounted () {
	  console.log('route: ', this.$route.query.id)
	  const property_id = this.$route.query.id as string || ''
	  this.fetchProperty(property_id)
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