import {BASE_URL, FOR_SALE, FOR_RENT} from './endpoints'
import axios from 'axios'
import type {AxiosResponse} from 'axios'

const VITE_RAPID_KEY:string = import.meta.env.VITE_RAPID_KEY
const VITE_RAPID_HOST:string = import.meta.env.VITE_RAPID_HOST

export async function getForSale (query: string, state: string) {
	var properties:any = []
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
	await axios.request(options)
		.then((response: AxiosResponse) => {
			const resp = response.data.properties
			// console.log('resp: ', resp);
			resp.map( property => {
				const newProperty = property
				properties.push(newProperty)
			})
		})
		.catch(error => {
			console.error(error);
			const errorMsg = error
		});
	return properties
}