import { defineComponent, h } from 'vue';

export const Suggestify = defineComponent({
	name: 'Suggestify',
	props: {
		class: {
			type: String,
			default: 'suggestify',
		},
	},
	setup: (props) => {
		return () =>
			h('div', {
				class: props.class,
				role: 'search',
			});
	},
	// template: `
	// <div id="suggestify" role="search" class="suggestify">
	//     <input placeholder="Search for city" aria-label="Search for city" class="suggestify-input" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="off" role="combobox" aria-autocomplete="list" aria-haspopup="listbox" aria-expanded="false" aria-owns="suggestify-results-d4Lwf">
	//     <button aria-label="Delete input" class="suggestify-clear" hidden=""><i class="suggestify-icon" role="presentation" focusable="false" aria-hidden="true"></i></button>
	//     <button type="submit" aria-label="Search" class="suggestify-submit"><i class="suggestify-icon" role="presentation" focusable="false" aria-hidden="true"></i></button>
	//     <ul id="suggestify-results-d4Lwf" class="suggestify-results" role="listbox"></ul>
	// </div>
	// `,
});
