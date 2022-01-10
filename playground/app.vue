<template>
    <Search
        class="suggestify"
        :content="t"
        engine="https://suggestify.maxvanderschee.nl/api/suggestions"
        event="https://suggestify.maxvanderschee.nl/api/events"
        :blur="false"
    />
</template>

<script setup lang="ts">
import Search from '../src/components/Search.vue';

const t: any = {
    placeholder: 'Search for a movie',
};
</script>

<style>
body {
    background-color: whitesmoke;
}
</style>
