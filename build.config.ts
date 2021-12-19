import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	declaration: true,
	emitCJS: false,
	clean: true,
	outDir: 'lib',
	entries: ['src/index', 'src/module', 'static/'],
	externals: ['vue', 'vue-demi', 'ohmyfetch', 'h3', '@nuxt/kit', '#app', '#build'],
});
