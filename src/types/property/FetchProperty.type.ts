export type QueryParams = {
	query?: string
	city: string
	state_code: string
	sqft_max?: string
	sqft_min?: string
	price_max?: string
	price_min?: string
	beds_min?: string
	baths_min?: string
	age_max?: string
	limit: string
	offset: string
	sort: string
	buyOrRent: 'buy' | 'rent'
}

