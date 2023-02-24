import {defineStore} from 'pinia'

export const useStore = defineStore({
	id: 'store',
	state: ()=>({
		paramsEncoded: ''
		}),
	getters: {
		getParamsEncoded: (state) => state.paramsEncoded
	},
	actions: {
		reset() {
			this.paramsEncoded = ''
		},
		setParamsEncoded(value: string) {
			this.paramsEncoded = value
		  },
	}
})