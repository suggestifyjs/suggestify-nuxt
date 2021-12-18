import { dirname, resolve } from 'pathe';
import { defineNuxtModule, addPluginTemplate } from '@nuxt/kit';
import { fileURLToPath } from 'url';

export default defineNuxtModule({
	name: 'suggestify',
	setup(_options, _nuxt) {
		const distDir = dirname(fileURLToPath(import.meta.url));

		addPluginTemplate({
			src: resolve(distDir, 'plugin.mjs'),
			filename: 'plugin',
			mode: 'client',
		});

		// addTemplate({
		// 	filename: 'Suggestify',
		// 	src: resolve(distDir, 'suggestify.mjs'),
		// });
	},
});
