<script>
import { store } from '../store';

import axios from 'axios';

export default {
    name: 'AppMain',

    data() {
        return {
            store,

            categories: [
                {
                    title: 'Popular TV Series',
                    apiString: 'tv/popular?'
                },
                {
                    title: 'Top Rated TV Series',
                    apiString: 'tv/top_rated?'
                },
                {
                    title: 'Popular Movies',
                    apiString: 'movie/popular?'
                },
                {
                    title: 'Top Rated Movies',
                    apiString: 'movie/top_rated?'
                }
            ]
        }
    },

    methods: {
        getMediaList(apiStringToCall, category) {
            axios.get(apiStringToCall).then(callReturn => {
                category.mediaList = callReturn.data.results;
                console.log(category.mediaList);
            }).catch(error => {
                store.getMediaListError = true;
            });
        }
    },

    mounted() {
        this.categories.forEach(category => {
            this.getMediaList(`${store.apiURL}${category.apiString}${store.apiKeyString}`, category);
        });
    }
}
</script>

<template>
    <main>
        <template v-if="store.searchResult.length">
            <ul class="search-results media-list">
                <li class="card" v-for="media in store.searchResult" :key="media.id"></li>
            </ul>
        </template>
        <template v-else>
            <div class="category" v-for="(category, index) in categories" :key="index">
                <h2>
                    {{ category.title }}
                </h2>
                <ul class="media-list">
                    <li class="card" v-for="media in category.mediaList" :key="media.id"></li>
                </ul>
            </div>
        </template>
    </main>
</template>

<style lang="scss" scoped></style>