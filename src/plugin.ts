// @ts-ignore: resolved with Nuxt
import { defineNuxtPlugin } from '#app';

import { Suggestify } from './suggestify';

export const plugin = defineNuxtPlugin((nuxtApp: any) => {
	nuxtApp.vueApp.component('Suggestify', Suggestify);
});
