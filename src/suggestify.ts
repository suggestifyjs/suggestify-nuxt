import { defineComponent, h, PropType, ref } from 'vue';
import { nanoid } from 'nanoid';

export interface Translations {
	placeholder?: string;
	buttonSubmit?: string;
	buttonCancel?: string;
}

export const Suggestify = defineComponent({
	name: 'Suggestify',
	props: {
		class: {
			type: String,
			default: 'suggestify',
		},
		t: {
			type: Object as PropType<Translations>,
		},
	},
	setup: (props, { slots }) => {
		const id = nanoid(6);
		const t = {
			placeholder: 'Search...',
			buttonSubmit: 'Search',
			buttonCancel: 'Delete input',
			...props.t,
		};

		const expanded = ref(false);

		const icon = h('i', {
			class: `${props.class}-icon`,
			role: 'presentation',
			focusable: 'false',
			'aria-hidden': 'true',
		});

		const results: string[] = [];

		return () =>
			h(
				'div',
				{
					class: props.class,
					role: 'search',
				},
				[
					h('input', {
						placeholder: t.placeholder,
						'aria-label': t.placeholder,
						class: `${props.class}-input`,
						autocomplete: 'off',
						autocapitalize: 'off',
						autocorrect: 'off',
						spellcheck: 'off',
						role: 'combobox',
						'aria-autocomplete': 'list',
						'aria-haspopup': 'listbox',
						'aria-expanded': expanded.value,
						'aria-owns': `${props.class}-results-${id}`,
					}),
					h(
						'button',
						{
							class: `${props.class}-btn ${props.class}-clear`,
							'aria-label': t.buttonCancel,
							hidden: !expanded.value,
						},
						slots.delete ? slots.delete() : icon
					),
					h(
						'button',
						{
							class: `${props.class}-btn ${props.class}-submit`,
							type: 'submit',
							'aria-label': t.buttonSubmit,
							onClick: () => (expanded.value = !expanded.value),
						},
						slots.submit ? slots.submit() : icon
					),
					h(
						'ul',
						{
							id: `${props.class}-results-${id}`,
							class: `${props.class}-results`,
							role: 'listbox',
						},
						results.length && results
					),
				]
			);
	},
});
