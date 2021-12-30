<template>
    <div role="search" :class="name">
        <input
            :placeholder="content.placeholder"
            :aria-label="content.placeholder"
            :class="`${name}-input`"
            autocomplete="off"
            autocapitalize="none"
            autocorrect="off"
            spellcheck="false"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            :aria-expanded="expanded"
            :aria-owns="`${name}-results-${id}`"
        />
        <button :aria-label="content.buttonCancel" :class="`${name}-clear`" :hidden="!expanded">
            <template #delete>
                <i :class="`${name}-icon`" role="presentation" focusable="false" aria-hidden="true"></i>
            </template>
        </button>
        <button type="submit" :aria-label="content.buttonSubmit" class="suggestify-submit">
            <template #submit>
                <i :class="`${name}-icon`" role="presentation" focusable="false" aria-hidden="true"></i>
            </template>
        </button>
        <ul :id="`${name}-results-${id}`" :class="`${name}-results`" role="listbox"></ul>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, PropType } from 'vue';
import { nanoid } from 'nanoid';
import { $fetch } from 'ohmyfetch';
import { Cache, Content, Result } from '../types';
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
});
const id = nanoid(6);
const timeout: number | any = 250;
const contentDefault = {
    placeholder: 'Search...',
    buttonSubmit: 'Search',
    buttonCancel: 'Delete input',
};
const content = computed(() => ({
    ...contentDefault,
    ...props.content,
}));

// const input = ref();

const selectedIndex = ref(-1);
const searchInput = ref('');
const cache: Ref<Cache> = ref({});
const expanded = ref(false);
const results: Ref<Result[]> = ref([]);

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
</script>

<style scoped lang="scss"></style>
