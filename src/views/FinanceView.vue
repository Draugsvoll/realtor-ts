<template>
	<main>
		<div>
			<h1>Financing</h1>
			<MortgageCalculator></MortgageCalculator>
		</div>
	</main>
</template>

<script lang="ts" setup>
import MortgageCalculator from '@/components/MortgageCalculator.vue'


</script>

<style lang="scss" scoped>
main {
	padding-bottom:6rem;
	border-bottom:1px solid rgba(0, 0, 0, 0.05);
	h1 {
		margin-bottom:2rem;
	}
	div{
		padding-top:var(--page-padding-top);
		@media screen and (max-width: 500px) {
			padding-top:var(--page-padding-top-mobile);
		}
	}
}
</style>