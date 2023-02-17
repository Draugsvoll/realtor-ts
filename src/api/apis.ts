import {BASE_URL, FOR_SALE, FOR_RENT, GET_DETAILS, CALCULATE_MORTGAGE} from './endpoints'
import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type { Property } from '@/types/property/Property.type'
import type { SearchParams } from '@/types/property/FetchProperty.type'
import type { MortgageParams } from '@/types/mortgage/Mortgage.type'
import type { PropertyDetailed } from '@/types/property/PropertyDetailed.type'
import type { MortgageStats } from '@/types/mortgage/Mortgage.type'

const headers = {
	'x-rapidapi-key': import.meta.env.VITE_RAPID_KEY,
	'x-rapidapi-host': import.meta.env.VITE_RAPID_HOST
}

export function getForSale(parameters: SearchParams): Promise<any> {
	const options = {
		method: 'GET',
		url: BASE_URL + FOR_SALE,
		params: parameters,
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

export function getForRental(parameters: SearchParams): Promise<any> {
	const options = {
		method: 'GET',
		url: BASE_URL + FOR_RENT,
		params: parameters,
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
			return response.data as PropertyDetailed
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

export function calculateMortgageApi (parameters: MortgageParams): Promise<any> {
	const options = {   
		method: 'GET',
		url: BASE_URL + CALCULATE_MORTGAGE,
		params: parameters,
		headers: headers
	}
	console.error('works: ', options)
	console.error('bug: ', parameters)
	return axios.request(options).then(function (response) {
		return response.data.mortgage as MortgageStats
	}).catch(function (error) {
		alert('api error (mortgage calculator): ' + error)
		return undefined
	});
}