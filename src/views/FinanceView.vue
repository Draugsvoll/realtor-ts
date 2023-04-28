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
main > div{
	padding-top:var(--page-padding-top);
}

</style>