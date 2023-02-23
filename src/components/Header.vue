<template>
	<header>
		<div><router-link to="/">Realtor</router-link></div>
		<div>
			<ul>
				<li><router-link to="/about">About</router-link></li>
				<li>Search</li>
				<li>Contact Us</li>
			</ul>
		</div>
		<div>item 3</div>
	</header>
</template>

<script setup lang="ts">

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
	justify-content:space-around;
	padding:0.1rem;
	backdrop-filter: blur(2px);
	div {
		padding:1rem;
		ul {
			li{
				display: inline-block;
				padding-left:1rem;
				padding-right:2rem;
				cursor:pointer;
			}
		}
	}
	}
</style>