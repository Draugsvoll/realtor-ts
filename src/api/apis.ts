import {BASE_URL, FOR_SALE, FOR_RENT} from './endpoints'
import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type { PropertyType } from '@/types/types'

const VITE_RAPID_KEY:string = import.meta.env.VITE_RAPID_KEY
const VITE_RAPID_HOST:string = import.meta.env.VITE_RAPID_HOST

export function getForSale(query: string, state: string): Promise {
	const options = {
		method: 'GET',
		url: BASE_URL + FOR_SALE,
		params: {
			city: query,
			state_code: state,
			limit: '20',
			offset: '0',
			sort: 'relevance'
		},
		headers: {
			'x-rapidapi-key': VITE_RAPID_KEY,
			'x-rapidapi-host': VITE_RAPID_HOST
		}
	};
	return axios.request(options)
		.then((response: AxiosResponse) => {
			let properties = response.data.properties
			return properties as PropertyType[]
		})
		.catch((error) => {
			console.error(error);
			return error
		});
}



export function getForRental(query: string, state: string): Promise {
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
		headers: {
			'x-rapidapi-key': VITE_RAPID_KEY,
			'x-rapidapi-host': VITE_RAPID_HOST
		}
	};
	return axios.request(options)
		.then((response: AxiosResponse) => {
			let properties = response.data.properties
			return properties as PropertyType[]
		})
		.catch((error) => {
			console.error(error);
			return error
		});
}