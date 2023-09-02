<template>
	<header>
		<div class="side-link"><router-link  to="/">Realtor</router-link></div>
		<div>
			<ul>
				<li><router-link class="link" to="/about">About</router-link></li>
				<li class="link" @click="goToSearch()">Search</li>
				<li @click="scroll()"><router-link class="link" to="/?view=contact">Contact</router-link></li>
			</ul>
		</div>
		<div class="side-link"><router-link  to="/finance">Financing</router-link></div>
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
* {
	color:var(--color-white);
	text-decoration: none;
}
header {
	font-size: var(--font-size-small);
	font-weight: 400;
	position: fixed;
	letter-spacing: var(--letter-spacing-smedium);
	width:100%;
	z-index: 3;
	background:rgba(0,0,0,0.4);
	display:flex;
	flex-wrap: wrap;
	justify-content:space-between;
	backdrop-filter: blur(2px);
	padding:0.2rem 2rem,;
	
	div {
		text-align: center;
		display:flex;
		flex-direction: column;
		flex-wrap:wrap;
		padding:1rem;
		ul {
			display:flex;
			flex-wrap:wrap;
			li{
				justify-content:center;
				display: flex;
				width:10rem;
				flex-grow:1;
				cursor:pointer;
				a{
					text-align:center;
				}
			}
		}
	}
	@media screen and (max-width: 730px) {
		justify-content:center;
		.side-link{
			display:none;
		}
	}
	@media screen and (max-width: 560px) {
		div {
			ul {
				li {
					width:7rem;
				}
			}
		}
	}
	@media screen and (max-width: 430px) {
		div {
			ul {
				li {
					width:5rem;
				}
			}
		}
	}
	
}
</style>