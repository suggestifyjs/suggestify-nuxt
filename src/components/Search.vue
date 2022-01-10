<template>
    <div role="search" :class="[name, { expanded }]">
        <input
            :placeholder="content.placeholder"
            :aria-label="content.placeholder"
            :class="`${name}-input`"
            autocomplete="off"
            autocapitalize="none"
            v-model="searchInput"
            autocorrect="off"
            spellcheck="false"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            :aria-expanded="expanded"
            :aria-owns="`${name}-results-${id}`"
            @click="inputSelected"
            @input="searchInputHandler"
            @blur="blurHandler"
            @keydown="keyHandler"
        />
        <button
            :aria-label="content.buttonCancel"
            :class="`${name}-clear`"
            :hidden="!expanded || !searchInput"
            @click="resetHandler"
        >
            <slot name="delete">
                <i :class="`${name}-icon`" role="presentation" focusable="false" aria-hidden="true"></i>
            </slot>
        </button>
        <button type="submit" :aria-label="content.buttonSubmit" class="suggestify-submit" @click="directSearch">
            <slot name="submit">
                <i :class="`${name}-icon`" role="presentation" focusable="false" aria-hidden="true"></i>
            </slot>
        </button>
        <ul v-show="results" :id="`${name}-results-${id}`" :class="`${name}-results`" role="listbox">
            <template v-if="results">
                <li v-if="content[results.type]" :class="`${name}-banner`">{{ content[results.type] }}</li>
                <li v-for="(item, index) in results.items" :key="index" :title="item">
                    <a :href="`${url}${item}`" :class="`${name}-link`" v-html="SearchResultsDisplay(item)"></a>
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, PropType, computed } from 'vue';
import { nanoid } from 'nanoid';
import { $fetch } from 'ohmyfetch';
import { Cache, Content, Result } from '../types';
import { sanitize } from '../utils';
import { switchFn } from '../utils';

const props = defineProps({
    name: {
        type: String,
        default: 'suggestify',
    },
    content: {
        type: Object as PropType<Content>,
        default: () => ({}),
    },
    engine: {
        type: String,
    },
    event: {
        type: String,
    },
    url: {
        type: String,
        default: '?q=',
    },
    blur: {
        type: Boolean,
        default: true,
    },
});

const id = nanoid(6);
let timeout: number | any = 250;

const contentDefault = {
    placeholder: 'Search...',
    buttonSubmit: 'Search',
    buttonCancel: 'Delete input',
    suggestions: 'Suggestions',
    empty: 'No suggestions found',
};

const content = computed(() => ({
    ...contentDefault,
    ...props.content,
}));

const searchInput = ref('');
const cache: Cache = {};
const expanded = ref(false);
const results: Ref<Result> = ref(null);

// ----------------
// Handlers
// ----------------

const request = async (search: string | null): Promise<Result> => {
    const query = search ? search : null;
    const cacheKey = JSON.stringify(query);
    if (cache[cacheKey]) return cache[cacheKey];

    try {
        const data = await $fetch(`${props.engine}`, {
            params: {
                q: query,
            },
        });

        cache[cacheKey] = data;

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

const keyHandler = ({ key }: KeyboardEvent): void => {
    const cases = {
        Enter: directSearch,
        Escape: resetHandler,
        // ArrowUp: selectItemUp,
        // ArrowDown: selectItemDown,
        _default: () => null,
    };
    const keySwitch = switchFn(cases, '_default');

    keySwitch(key);
};

const cleanInput = () => {
    const input = searchInput.value.trim().toLowerCase();

    return input ? sanitize(input) : '';
};

const blurHandler = (): void => {
    if (props.blur) {
        setTimeout(() => {
            resetHandler();
        }, 100);
    }
};
const resetHandler = (): void => {
    searchInput.value = '';
    results.value = null;
    expanded.value = false;
};

const inputSelected = async (): Promise<void> => {
    const search = cleanInput();

    try {
        const response = await request(search);

        results.value = response;
        expanded.value = true;
    } catch (error: any) {
        throw new Error(error);
    }
};

const directSearch = (): void => {
    const search = cleanInput();

    if (search) {
        const searchInResults = results.value.items.find((item) => item === search);
        const success = searchInResults ? 'HIT' : 'MISS';

        if (props.event) navigator.sendBeacon(props.event, JSON.stringify({ value: search, success }));

        window.location.href = `${props.url}${search}`;
    }
};

const searchInputHandler = (): void => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(async () => {
        const search = cleanInput();

        if (props.engine)
            try {
                const response = await request(search);

                results.value = response;
                expanded.value = true;
            } catch (error: any) {
                throw new Error(error);
            }
    }, 250);
};

const SearchResultsDisplay = (item: string) => {
    if (results.value.type === 'results') {
        const words = searchInput.value ? searchInput.value.split(' ') : [];
        let text = item;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            text = text.replace(word, `<b>${word}</b>`);
        }

        return text;
    } else return item;
};
</script>

<style scoped lang="scss"></style>
