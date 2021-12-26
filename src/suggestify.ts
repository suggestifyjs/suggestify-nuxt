import { defineComponent, h, PropType, ref, Ref } from 'vue';
import { nanoid } from 'nanoid';
import { $fetch } from 'ohmyfetch';

// -------------------------------------------------------------
// Typing
// -------------------------------------------------------------

export interface Translations {
	placeholder?: string;
	buttonSubmit?: string;
	buttonCancel?: string;
}

export interface Event {
	value: string;
	success: 'HIT' | 'MISS';
}

export interface Translations {
	suggestions: string;
	results: string;
}

export interface Cache {
	[key: string]: Result;
}

export interface Result {
	type: 'results' | 'suggestions' | 'empty';
	items: string[];
	time: number;
}

// -------------------------------------------------------------
// Helpers
// -------------------------------------------------------------

const sanitize = (string: string) => {
	const map: { [key: string]: string } = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		'`': '&grave;',
		'/': '&#x2F;',
	};
	const reg = /[&<>"'/`]/gi;
	return string.replace(reg, (match) => map[match]);
};

const switchFn =
	(lookupObject: any, defaultCase = '_default') =>
	(expression: string) =>
		(lookupObject[expression] || lookupObject[defaultCase])();

// -------------------------------------------------------------
// Component
// -------------------------------------------------------------

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
		url: {
			type: String,
			default: '?q=',
		},
		engine: {
			type: String,
			default: '',
		},
		blur: {
			type: Boolean,
			default: true,
		},
		instant: {
			type: Boolean,
			default: false,
		},
		event: {
			type: Boolean,
			default: false,
		},
	},
	setup: (props, { slots }) => {
		const id = nanoid(6);
		// const timeout: number | any = 250;
		const t = {
			placeholder: 'Search...',
			buttonSubmit: 'Search',
			buttonCancel: 'Delete input',
			...props.t,
		};

		const input = ref();

		// const selectedIndex = ref(-1);
		const searchInput = ref('');
		const cache: Ref<Cache> = ref({});
		const expanded = ref(false);
		const results: Ref<Result[]> = ref([]);

		// ------------------------------------------------------------
		//  Functions
		// ------------------------------------------------------------
		const request = async (search: string | null): Promise<Result> => {
			const query = search ? search : null;
			const cacheKey = JSON.stringify(query);
			if (cache.value[cacheKey]) return cache.value[cacheKey];

			try {
				const { data } = await $fetch(`${props.engine}`, {
					params: {
						q: query,
					},
				});

				cache.value[cacheKey] = data;
				return data;
			} catch (error: any) {
				throw new Error(error);
			}
		};

		const keyHandler = ({ key }: KeyboardEvent): void => {
			const cases = {
				Enter: directSearch,
				Escape: deleteResultList,
				ArrowUp: selectItemUp,
				ArrowDown: selectItemDown,
				_default: () => null,
			};
			const keySwitch = switchFn(cases, '_default');

			keySwitch(key);
		};

		const clearInput = (): void => {
			searchInput.value = '';
			input.value = '';

			deleteResultList();
		};

		const blurHandler = (): void => {
			setTimeout(() => {
				deleteResultList();
			}, 100);
		};

		const inputSelected = async (): Promise<void> => {
			try {
				const response = await request(searchInput.value);

				deleteResultList();
				createResultList(response);
			} catch (error: any) {
				throw new Error(error);
			}
		};

		// ------------------------------------------------------------
		//  Render
		// ------------------------------------------------------------
		const icon = h('i', {
			class: `${props.class}-icon`,
			role: 'presentation',
			focusable: 'false',
			'aria-hidden': 'true',
		});

		// list item
		const item = (item: any) =>
			h('li', {
				class: `${item.class}`,
			});

		return () =>
			// root
			h(
				'div',
				{
					class: props.class,
					role: 'search',
				},
				[
					// input field
					h('input', {
						ref: input,
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
						onClickPassive: inputSelected,
						onKeydownPassive: keyHandler,
						onInputPassive: searchInputHandler,
						onBlurPassive: () => props.blur && blurHandler,
						onMouseOverOnce: () => props.instant && autoSuggest,
					}),
					// clear button
					h(
						'button',
						{
							class: `${props.class}-btn ${props.class}-clear`,
							'aria-label': t.buttonCancel,
							hidden: !expanded.value,
						},
						slots.delete ? slots.delete() : icon
					),
					// submit button
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
					// result list
					h(
						'ul',
						{
							id: `${props.class}-results-${id}`,
							class: `${props.class}-results`,
							role: 'listbox',
						},
						() =>
							results.value && results.value.length
								? results.value.map((result) => (slots.item ? slots.item(result) : item(result)))
								: null
					),
				]
			);
	},
});
