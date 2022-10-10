
<template>
	<div>
		<h1>Search Results</h1>
		<Property v-for="property in orderedProperties" :property="property" />
	</div>
</template>

<script  lang="ts">
	import type { PropertyType } from '@/types/types';
	import { computed, defineComponent, type PropType } from 'vue';
	import Property from './Property.vue';
	
	export default defineComponent({
    props: {
        properties: {
            required: true,
            type: Array as PropType<PropertyType[]>
        },
    },
    setup(props) {
        console.log("props: ", props.properties);
        const orderedProperties = computed(() => {
            return [...props.properties].sort((a: PropertyType, b: PropertyType) => {
                return a["price"] > b["price"] ? +1 : -1;
            });
        });
        return { orderedProperties };
    },
    components: { Property }
})
</script>

<style scoped>
	
</style>