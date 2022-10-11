
<template>
	<div>
		<h1>Search Results</h1>
        <p>{{test}}</p>
		<button @click="sort()">sort</button>
		<Property v-for="property in orderedProperties" :property="property" />
	</div>
</template>

<script  lang="ts">
	import type { PropertyType } from '@/types/types';
	import { computed, defineComponent, ref, type PropType } from 'vue';
	import Property from './Property.vue';
	
	export default defineComponent({
    props: {
        properties: {
            required: true,
            type: Array as PropType<PropertyType[]>
        },
    },
    setup(props) {
        let test = ref('listing_id')

        let orderedProperties = ref(props.properties)

        function sort() {
            this.test = 'price'
            this.orderedProperties = [...props.properties].sort((a: PropertyType, b: PropertyType) => {
                return a[this.test] > b[this.test] ? +1 : -1;
            })
        }

        return { orderedProperties, sort, test };
    },
    components: { Property }
})
</script>

<style scoped>
	
</style>