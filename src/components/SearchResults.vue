
<template>
	<div>
		<h1>Search Results</h1>
		<Property v-for="property in properties" :property="property" />
		<Property :test="test" />
		<!-- <p v-for="property in properties"></p> -->
	</div>
</template>

<script setup lang="ts">
	import { onMounted, reactive, ref, toRef, toRefs } from "vue";
	import Property from "./Property.vue";

	import {useRouter, useRoute} from 'vue-router'
	import { getForSale } from "@/api/apis";

	const router = useRouter()
	const route = useRoute()
	let properties: any = []
	let test0 = 'empty'
	let test = ref(test0)

	

	async function fetchData (query: string, state: string) {
		properties = await getForSale(query, state);
		console.log('properties fetched: ', properties);
	}
	
	onMounted(() => {
		const query = route.query.query as string || ''
		const state = route.query.state as string || ''
		// fetchData(query, state)
		test0 = 'hello'
	})

</script>

<style scoped>
	
</style>