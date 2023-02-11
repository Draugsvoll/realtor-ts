
<template>
	<div>
        <button @click="sortPriceHigh()">Price high</button>
        <button @click="sortPriceLow()">Price Low</button>
        <button @click="sortAlphabetical()">A-Z</button>
        <h1>Search Results</h1>
        <transition-group tag="ul" name="list">
            <li v-for="property in orderedProperties" :key="property.property_id" >
                <PropertyComp :property="property"></PropertyComp>
            </li>
        </transition-group>
	</div>
</template>

<script  lang="ts">
	import type { Property } from '@/types/property/Property.type';
	import { defineComponent, ref, type PropType } from 'vue';
	import PropertyComp from './Property.vue';
	
	export default defineComponent({
    props: {
        properties: {
            required: true,
            type: Array as PropType<Property[]>
        },
    },
    setup(props) {
        const orderedProperties = ref(props.properties)
        
        function sortPriceHigh() {
            const sortBy = 'price'
            orderedProperties.value = [...props.properties].sort((a: Property, b: Property) => {
                return a[sortBy] < b[sortBy] ? +1 : -1;
            })
        }

        function sortPriceLow() {
            const sortBy = 'price'
            orderedProperties.value = [...props.properties].sort((a: Property, b: Property) => {
                return a[sortBy] > b[sortBy] ? +1 : -1;
            })
        }

        function sortAlphabetical() {
            const filteredList = orderedProperties.value.filter(property => property['address']['neighborhood_name'] !== undefined)
            orderedProperties.value = filteredList.sort((a: Property, b: Property) =>
                a['address']['neighborhood_name'] && b['address']['neighborhood_name'] // check if these exist
                    ? a['address']['neighborhood_name'].localeCompare(b['address']['neighborhood_name'])
                    : 0
            )
        }

        return { orderedProperties, sortPriceHigh, sortPriceLow, sortAlphabetical };
    },
    components: { PropertyComp }
})
</script>

<style scoped lang="scss">
	.list-move {
        transition: all 1s;
    }
    
    ul {
        display:inline-flex;
        flex-wrap: wrap;
        justify-content:center;
        li {
            display:inline-flex;
        }
    }
    
</style>