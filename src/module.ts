import { defineNuxtModule } from '@nuxt/kit';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export default defineNuxtModule({
    name: 'suggestify',
    configKey: 'suggestify',
    hooks: {
        'components:dirs'(dirs) {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            // Add ./components dir to the list
            dirs.push({
                path: resolve(__dirname, 'components'),
                prefix: 'suggestify',
            });
        },
    },
    setup(_options, nuxt) {
        // add @suggestify/nuxt to transpile target for alias resolution
        nuxt.options.build = nuxt.options.build || {};
        nuxt.options.build.transpile = nuxt.options.build.transpile || [];
        nuxt.options.build.transpile.push('@suggestify/nuxt');
    },
});
