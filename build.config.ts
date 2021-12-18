import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	declaration: true,
	emitCJS: false,
	clean: true,
	outDir: 'lib',
	entries: ['src/index', 'src/plugin', 'src/suggestify', 'static/'],
	externals: ['@nuxt/kit', 'vue', '#app', 'pathe', 'url'],
});
