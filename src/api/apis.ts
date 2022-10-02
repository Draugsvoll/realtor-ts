import {BASE_URL, FOR_SALE, FOR_RENT} from './endpoints'
import axios from 'axios'

export async function getForSale (query: string) {
	console.log('query: ', query)
	var properties:any = []
	const options = {
		method: 'GET',
		url: BASE_URL + FOR_SALE,
		params: {
			city: query,
			state_code: 'NY',
			limit: '20',
			offset: '0',
			sort: 'relevance'
		},
		headers: {
			'x-rapidapi-key': '624dc7754bmsh3f19b0e1fbd4882p18e7f1jsn0d9d641d8df8',
			'x-rapidapi-host': 'realtor.p.rapidapi.com'
	}
	};
	await axios.request(options).then(function (response) {
		const resp = response.data.properties
		// console.log('resp: ', resp);
		resp.map( property => {
			const newProperty = property
			properties.push(newProperty)
		})
	}).catch(function (error) {
		console.error(error);
	});
	return properties;
}