import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	declaration: true,
	emitCJS: true,
	clean: true,
	outDir: 'lib',
	entries: ['src/module', 'src/plugin', 'src/suggestify', 'static/'],
	externals: ['@nuxt/kit', 'vue', '#app', 'pathe', 'url'],
});
