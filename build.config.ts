import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    declaration: true,
    rollup: {
        emitCJS: false,
    },
    clean: true,
    outDir: 'lib',
    entries: [
        'src/index',
        'src/module',
        'static/',
        {
            input: 'src/components/',
            outDir: 'lib/components',
        },
    ],
    externals: ['vue', 'vue-demi', 'ohmyfetch', 'h3', '@nuxt/kit', '#app', '#build'],
});
