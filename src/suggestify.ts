import { defineComponent } from 'vue';

export const Suggestify = defineComponent({
	name: 'Suggestify',
	props: {
		name: String,
	},
	setup: () => ({}),
	template: `
    div class="suggestify" role="search">
		<input placeholder="Search..." aria-label="Search" />
		<button aria-label="Delete input"></button>
		<button type="submit" aria-label="Search"></button>
	</div>
    `,
});
