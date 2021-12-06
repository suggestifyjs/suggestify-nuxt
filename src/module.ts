import { dirname, resolve } from 'pathe';
import { defineNuxtModule, addPlugin } from '@nuxt/kit';
import { fileURLToPath } from 'url';

export default defineNuxtModule({
	name: 'suggestify',
	setup(_options, _nuxt) {
		const distDir = dirname(fileURLToPath(import.meta.url));

		addPlugin(resolve(distDir, 'plugin'));
	},
});
