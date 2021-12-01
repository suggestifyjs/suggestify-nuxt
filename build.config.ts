import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	declaration: true,
	emitCJS: false,
	clean: true,
	outDir: 'lib',
	entries: ['src/', 'static/'],
	externals: ['@nuxt/kit', 'vue'],
});
