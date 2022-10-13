
<template>
	<div>
        <button @click="sortPriceHigh()">Price high</button>
        <button @click="sortPriceLow()">Price Low</button>
        <button @click="sortAlphabetical()">Alphabetical</button>
        <button @click="sort()">sort</button>
        <transition-group tag="ul" name="list">
            <li class="test" v-for="property in orderedProperties" :property="property" :key="property" >
                <p>${{property.price.toLocaleString()}}</p>
                <p>{{property.address.neighborhood_name}}</p>
                <p>{{property.property_id}}</p>
                <p>{{property.address.line}}</p>
            </li>
        </transition-group>
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
            let filteredList = this.orderedProperties.filter(property => property['address']['neighborhood_name'] !== undefined)
            this.orderedProperties = filteredList.sort((a: PropertyType, b: PropertyType) =>
                a['address']['neighborhood_name'].localeCompare(b['address']['neighborhood_name']))
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
    .test {
        margin:1.5rem auto;
        background: rgb(50, 48, 55);
    }
</style>