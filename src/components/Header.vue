<template>
	<header>
		<div><router-link  to="/">Realtor</router-link></div>
		<div>
			<ul>
				<li><router-link to="/about">About</router-link></li>
				<li @click="goToSearch()">Search</li>
				<li @click="scroll()"><router-link to="/?view=contact">Contact</router-link></li>
			</ul>
		</div>
		<div>item 3</div>
	</header>
</template>

<script setup lang="ts">
import {useRouter, useRoute} from 'vue-router'
import {useStore} from '@/store/store'

	const store = useStore()
	const router = useRouter()
	const route = useRoute()

	// Make sure scroll-to-element always work
	function scroll () {
		if (route.query.view) {
			router.push('/')
		}
	}

	function goToSearch () {
		store.reset()
		router.push('/search')
	}
</script>

<style scoped lang="scss">
a {
	text-decoration: none;
	color:inherit;
}
header {
	position: fixed;
	width:100%;
	z-index: 3;
	background:rgba(0,0,0,0.4);
	display:flex;
	justify-content:space-between;
	padding:0.1rem;
	backdrop-filter: blur(2px);
	div {
		padding:1rem;
		width:100%;
		text-align: center;
		ul {
			display:flex;
			justify-content: space-evenly;
			li{
				display: flex;
				flex-grow:1;
				align-items: center;
				justify-content: center;
				cursor:pointer;
			}
		}
	}
}
</style>