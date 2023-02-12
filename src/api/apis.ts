import {BASE_URL, FOR_SALE, FOR_RENT, GET_DETAILS, CALCULATE_MORTGAGE} from './endpoints'
import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type { Property } from '@/types/property/Property.type'
import type { FetchPropertiesForSaleParams } from '@/types/property/FetchProperty.type'

const headers = {
	'x-rapidapi-key': import.meta.env.VITE_RAPID_KEY,
	'x-rapidapi-host': import.meta.env.VITE_RAPID_HOST
}



export function getForSale(parameters: FetchPropertiesForSaleParams): Promise<any> {
	let params: FetchPropertiesForSaleParams = parameters

	if (parameters.sqft_max) params['sqft_max'] = parameters.sqft_max 
	if (parameters.sqft_min) params['sqft_min'] = parameters.sqft_min 
	if (parameters.price_max) params['price_max'] = parameters.price_max 
	if (parameters.price_min) params['price_min'] = parameters.price_min 
	if (parameters.beds_min) params['beds_min'] = parameters.beds_min 
 	if (parameters.baths_min) params['baths_min'] = parameters.baths_min
	if (parameters.age_max) params['age_max'] = parameters.age_max 

	const options = {
		method: 'GET',
		url: BASE_URL + FOR_SALE,
		params: params,
		headers: headers
	};
	
	return axios.request(options)
		.then((response: AxiosResponse) => {
			console.log(response)
			return response.data.properties as Property[]
		})
		.catch((error) => {
			alert('api error (get for_sale properties): ' + error)
			return undefined
		});
}



export function getForRental(query: string, state: string): Promise<any> {
	const options = {
		method: 'GET',
		url: BASE_URL + FOR_RENT,
		params: {
			city: query,
			state_code: state,
			limit: '20',
			offset: '0',
			sort: 'relevance'
		},
		headers: headers
	};
	return axios.request(options)
		.then((response: AxiosResponse) => {
			return response.data.properties as Property[]
		})
		.catch((error) => {
			alert('api error (get for_rental properties): ' + error)
			return undefined
		});
}


export function getPropertyDetails (id: string): Promise<any> {
	const options = {
		method: 'GET',
		url: BASE_URL + GET_DETAILS,
		params: {property_id: id},
		headers: headers
	};

	return axios.request(options)
		.then(function (response) {
			return response.data as Property
		})
		.catch(function (error) {
			alert('api error (get property details): ' + error)
			return undefined
		});
}


export function getSimilarProperties (property_id: string, status: string): Promise<any> {
	const options = {
		method: 'GET',
		url: 'https://realtor.p.rapidapi.com/properties/v3/list-similar-homes',
		params: {property_id: 'M4891776412', limit: '15', status: 'for_sale'},
		headers: headers
	  };
	  
	  return axios.request(options).then(function (response) {
		  console.log(response.data);
	  }).catch(function (error) {
		  console.error(error);
		  alert('api error (get similar properties): ' + error)
		  return undefined
	  });
}

export function calculateMortgageApi (hoi: string, tax_rate: string, downpayment: string, price: string, term: string, rate: string): Promise<any> {
	const options = {   
		method: 'GET',
		url: BASE_URL + CALCULATE_MORTGAGE,
		params: {
			hoi: hoi,
			tax_rate: tax_rate,
			downpayment: downpayment,
			price: price,
			term: term,
			rate: rate
		},
		headers: headers
	}
	console.error('url: ', options)
	return axios.request(options).then(function (response) {
		return response.data.mortgage
	}).catch(function (error) {
		alert('api error (mortgage calculator): ' + error)
		return undefined
	});
}