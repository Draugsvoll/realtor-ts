
<template>
	<div>
		<h1>Search Results</h1>
        <p>{{sortTerm}}</p>
		<Property v-for="property in orderedProperties" :property="property" :sortTerm="sortTerm" />
		<!-- <button @click="sort()">sort</button> -->
	</div>
</template>

<script  lang="ts">
	import type { PropertyType, SortTerm } from '@/types/types';
	import { computed, defineComponent, ref, type PropType } from 'vue';
	import Property from './Property.vue';
	
	export default defineComponent({
    props: {
        properties: {
            required: true,
            type: Array as PropType<PropertyType[]>
        },
        sortTerm: {
            required: true,
            type: String as PropType<SortTerm>
        },
    },
    setup(props) {
        const orderedProperties = computed(() => {
            return [...props.properties].sort((a: PropertyType, b: PropertyType) => {
                return a[props.sortTerm] > b[props.sortTerm] ? +1 : -1;
            });
        });
        return { orderedProperties };
    },
    components: { Property }
})
</script>

<style scoped>
	
</style>