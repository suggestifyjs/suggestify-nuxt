import { dirname, resolve } from 'pathe';
import { defineNuxtModule, addPlugin, addTemplate } from '@nuxt/kit';
import { fileURLToPath } from 'url';

export default defineNuxtModule({
	name: 'suggestify',
	setup(_options, nuxt) {
		const distDir = dirname(fileURLToPath(import.meta.url));

		addPlugin(resolve(distDir, 'plugin'));

		addTemplate({
			filename: 'suggestify.mjs',
			async getContents() {
				const path = resolve(distDir, 'suggestify.mjs');

				// const serializedRoutes = addComponentToRoutes(pages);
				// return `export default ${templateUtils.serialize(serializedRoutes)}`;
				return 'export default {}';
			},
		});
	},
});
