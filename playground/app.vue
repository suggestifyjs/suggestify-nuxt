<template>
	<Suggestify class="suggestify" :t="t" />
</template>

<script setup lang="ts">
import { Suggestify } from '@suggestify/nuxt';

const t: any = {
	placeholder: 'Search for a movie',
};
</script>
