import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
	name: 'suggestify',
	setup(_options, nuxt) {
		// add @suggestify/nuxt to transpile target for alias resolution
		nuxt.options.build = nuxt.options.build || {};
		nuxt.options.build.transpile = nuxt.options.build.transpile || [];
		nuxt.options.build.transpile.push('@suggestify/nuxt');
	},
});
