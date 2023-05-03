<template>
	<div class="mortgage-container" v-if="mortgageInputs">
		<div class="input-data">
			<h2>Mortgage</h2>
			<form >
				<div class="labels"><div class="label">Price</div><div class="label label-value">${{ Number(mortgageInputs.price).toLocaleString() }}</div></div>
				<input class="range"  v-model="mortgageInputs.price" type="range" min="1" :max="mortgagePriceMax" step="1">

				<div class="labels"><div class="label">Property Tax (yearly)</div><div class="label label-value">{{ Number(mortgageInputs.tax_rate).toFixed(1) }}%</div></div>
				<input class="range"  v-model="mortgageInputs.tax_rate" type="range" min="0" max="10" step="0.1">
				
				<div class="labels"><div class="label">Monthly Insurance</div><div class="label label-value">${{Number(mortgageInputs.hoi).toLocaleString()}}</div></div>
				<input class="range"  v-model="mortgageInputs.hoi" type="range" min="0" max="1000">
				
				<div class="labels"><div class="label"> Duration (years)</div><div class="label label-value">{{ mortgageInputs.term }}</div></div>
				<input class="range"  v-model="mortgageInputs.term" type="range" min="1" max="30">
				
				<div class="labels"><div class="label"> Downpayment</div><div class="label label-value"> ${{ Number(mortgageInputs.downpayment).toLocaleString() }}</div></div>
				<input class="range" v-model="mortgageInputs.downpayment" type="range" min="1000" :max="mortgageInputs.price">
			</form>
			<button class="button" @click="calculateMortgage">Calculate</button>
		</div>
		<div class="output-data" v-if="mortgageOutput && dataReady">
			<div>
				<div id="loader" class="loader" v-if="isLoadingData">
					<div class="spinner" id="spinner"></div>
					<!-- <p class="loading-text">Loading AI..</p> -->
				</div>
				<div class="span chartTitle">
					<h2>${{ mortgageOutput.monthly_payment.toLocaleString() }} Monthly Payment</h2>
					</div> 
				<GChart 
					type="PieChart"
					:data="chartData" :options="chartOptions">
				</GChart>
			</div>
			<!-- <div>
				<div class="output-header">Overall</div>
				<div class="span">{{ mortgageOutput.term }} Years </div> 
				<div class="span">{{ mortgageOutput.rate }}% Interest</div> 
				<div class="span">${{ mortgageOutput.down_payment.toLocaleString() }} Downpayment</div> 
				<div class="span">${{ mortgageOutput.loan_amount.toLocaleString() }} Loan</div> 
				<div class="span">${{ mortgageOutput.total_payment.toLocaleString() }} Total Cost</div> 
			</div> -->
		</div>
	</div>
</template>

<script lang="ts">
import type { MortgageParams, MortgageStats } from '@/types/mortgage/Mortgage.type';
import { defineComponent, reactive, ref, type PropType, onMounted } from 'vue'
import { calculateMortgageApi } from '@/api/apis';
import {GChart} from 'vue-google-charts';


export default defineComponent({
  name: 'MortgageCalculator',
  components: {
	GChart
  },
  props: {
	price: {
      type: Number as PropType<number>,
      required: false
    }
  },
  setup(props) {
	const mortgagePriceMax = ref(<number>1000000)
	const dataReady = ref(false)
	const isLoadingData = ref(false)
	const viewportWidth = ref(window.innerWidth);
	const chartWidth = viewportWidth.value > 520 ? 500 : 310
		
	const mortgageInputs = ref<MortgageParams>({
		hoi: '100', // monhly home insurances
		tax_rate: '1.8', // property tax rate
		downpayment: '1000',
		price: '500000',
		term: '25', // loan duration years
		rate: '1.2', // interest rate
	})
	if (props.price) {
		mortgageInputs.value.price = props.price.toString()
		if (props.price > 1000000) {
			mortgagePriceMax.value = Number(props.price)*1.2
		}
	}
	
	const mortgageOutput = ref<MortgageStats>({
		loan_amount: 100000,
		rate: 4.5,
		term: 30,
		monthly_payment: 0,
		principal_and_interest: 400,
		monthly_property_taxes: 123,
		monthly_home_insurance: 200,
		hoa_fees: 0,
		monthly_mortgage_insurance: 0,
		total_payment: 0,
		down_payment: 0,
	})

	const chartData = reactive([
		['Expense', 'Dollars'],
		['Property Tax', mortgageOutput.value.monthly_property_taxes ],
		['Principal and interest', mortgageOutput.value.principal_and_interest, ],
		['Insurance', mortgageOutput.value.monthly_home_insurance, ],
	])

	const chartOptions = {
		title: '',
		pieHole: 0.4,
		backgroundColor:'transparent',
		is3D: false,
		'width':chartWidth,
		'height':250,
		chartArea: {
          left: '5%',
          top: '0%',
          width: '100%',
          height: '90%'
        },
		titleTextStyle: {
			fontSize:18,	
			color:'var(--color-font-dark)',
		},
		legend: {
			textStyle: {
				fontSize: 15,
				color:'var(--color-font-dark)'
			}
		},
		pieSliceTextStyle: {
			fontSize: 14,
			fontName: "Arial",
			bold:false,
		},
	}

	async function calculateMortgage() {
		dataReady.value = true
		isLoadingData.value = true
		mortgageOutput.value = await calculateMortgageApi(mortgageInputs.value)
		// must update ChartData - not reactive
		chartData[1][1] = mortgageOutput.value.monthly_property_taxes
		chartData[2][1] = mortgageOutput.value.principal_and_interest
		chartData[3][1] = mortgageOutput.value.monthly_home_insurance
		isLoadingData.value = false
	}
	
	onMounted(() => {
		calculateMortgage()
	})
	
    return {mortgageOutput, mortgagePriceMax, chartData, chartOptions, calculateMortgage, mortgageInputs, dataReady, isLoadingData}
}

}

)
</script>

<style lang="scss" scoped>
.chartTitle {
	margin:auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom:1.5rem;
	flex-wrap: wrap;
}
.mortgage-container {
	max-width:var(--page-width-medium);
	padding: 0.5rem;
	display: flex;
	flex-wrap: wrap;
	margin: 0px auto;
	justify-content: space-between;
	align-items: center;
	h2 {
		letter-spacing: var(--letter-spacing-medium);
	}
	.input-data {
		margin:1rem auto;
		width:25rem;
		.labels {
			display:flex;
			justify-content: space-between;
			.label {
				font-size: var(--font-size-smedium);
			}
			.label-value {
				font-size: var(--font-size-medium);
			}
		}
		form {
			displaY: flex;
			flex-direction: column;
			margin: auto;
			width:100%;
			input {
				margin-top:0.5rem;
				margin-bottom: 1.2rem;
				margin-left: 0rem;
			}
		}
		button {
			margin-top:1rem;
			background: transparent;
			color:var(--color-primary);
		}
		button:hover {
			background: var(--color-primary);
			color:white;
		}
	}
	.output-data {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		z-index:1;
		margin:auto;
		.output-header {
			font-weight: bold;
		}
		.span {
			margin-top: 0.5rem;
		}
		.loader {
			visibility: visible;
			display:flex;
			position:absolute;
			flex-direction:column;
			height:100%;
			width:100%;
			background:rgba(255, 255, 255, 0.4);
			z-index:100;
		  }
		  .spinner {
			 visibility: visible;
			 position:absolute;
			 top: 40%;
			 left:50%;
			 margin-left:-38px;
			 height:80px;
			 width:80px;
			 -webkit-animation: rotation .6s infinite linear;
			 -moz-animation: rotation .6s infinite linear;
			 -o-animation: rotation .6s infinite linear;
			 animation: rotation .6s infinite linear;
			 border:8px solid rgba(0,174,239,0.35);
			 border-top:8px solid rgba(0,174,239,0.9);
			 border-radius:100%;
		  }
		  @-webkit-keyframes rotation {
			from {-webkit-transform: rotate(0deg);}
			to {-webkit-transform: rotate(359deg);}
		 }
		 @-moz-keyframes rotation {
			from {-moz-transform: rotate(0deg);}
			to {-moz-transform: rotate(359deg);}
		 }
		 @-o-keyframes rotation {
			from {-o-transform: rotate(0deg);}
			to {-o-transform: rotate(359deg);}
		 }
		 @keyframes rotation {
			from {transform: rotate(0deg);}
			to {transform: rotate(359deg);}
		 }
	}


}
</style>