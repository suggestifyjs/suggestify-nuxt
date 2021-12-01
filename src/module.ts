import { defineNuxtModule } from '@nuxt/kit';
// import { dirname, resolve } from 'path';
// import { fileURLToPath } from 'url';

interface ModuleOptions {
	appName: string;
	chainId: string;
	rpcEndpoints: string[];
}

export default defineNuxtModule<ModuleOptions>({
	name: 'suggestify',
	configKey: 'suggestify',
	setup(options: ModuleOptions) {
		console.log(options);

		// const __filename = fileURLToPath(import.meta.url);
		// const __dirname = dirname(__filename);

		// addPluginTemplate({
		// 	src: resolve(__dirname, './plugin.mjs'),
		// 	filename: 'nuxt3-ual.mjs',
		// 	mode: 'client',
		// 	options,
		// });
	},
});

// @ts-ignore: resolved with Nuxt
// declare module '#app' {
// 	interface NuxtApp {
// 		$suggestify: Suggestify;
// 	}
// }

declare module '@nuxt/kit' {
	interface NuxtConfig {
		suggestify?: ModuleOptions;
	}
}
