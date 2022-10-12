
<template>
	<div>
        <button @click="sortPriceHigh()">Price high</button>
        <button @click="sortPriceLow()">Price Low</button>
        <button @click="sortAlphabetical()">Alphabetical</button>
        <button @click="sort()">sort</button>
        <!-- <transition-group tag="ul" name="list"> -->
            <Property v-for="property, index in orderedProperties" :property="property" :key="index" />
        <!-- </transition-group> -->
		<h1>Search Results</h1>
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
        let orderedProperties = ref(props.properties)
        
        function sortPriceHigh() {
            this.test = 'price'
            this.orderedProperties = [...props.properties].sort((a: PropertyType, b: PropertyType) => {
                return a[this.test] < b[this.test] ? +1 : -1;
            })
        }

        function sortPriceLow() {
            this.test = 'price'
            this.orderedProperties = [...props.properties].sort((a: PropertyType, b: PropertyType) => {
                return a[this.test] > b[this.test] ? +1 : -1;
            })
        }

        function sortAlphabetical() {
            let list = this.orderedProperties.sort((a:any, b:any) => 
                a['address']['neighborhood_name'].localeCompare(b['address']['neighborhood_name']))
            return list
        }

        return { orderedProperties, sortPriceHigh, sortPriceLow, sortAlphabetical };
    },
    components: { Property }
})
</script>

<style scoped>
	.list-move {
        transition: all 1s;
    }
</style>