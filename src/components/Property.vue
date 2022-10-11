<template>
	<div class="container">

		<!-- Buy -->
		<div v-if="property.prop_status === 'for_sale'">
			<p>${{property.price.toLocaleString()}}</p>
			<!-- <p>{{property.address.line}}</p>
			<p>{{property.address.city}}</p>
			<img width="100" :src="property.thumbnail" alt=""> -->
		</div>

		<!-- Renting -->
		<!-- <div v-if="property.prop_status === 'for_rent'">
			<p>${{property.community.price_min.toLocaleString()}}</p>
			<p>{{property.address.line}}</p>
			<p>{{property.address.city}}</p>
			<img width="100" :src="property.photos[0].href" alt="">
		</div> -->
	</div>
</template>

<script lang="ts">
	import type { PropertyType } from '@/types/types';
	import { defineComponent, type PropType } from 'vue';

	export default defineComponent({
		props: {
			property: {
				required: true,
				type: Object as PropType<PropertyType>
			},
	},
	setup() {
	},
	})
</script>


<style scoped>
.container {
	margin:1rem auto;
}
</style>