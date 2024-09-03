<script>
import { store } from '../store';
import axios from 'axios';

import MediaCard from './MediaCard.vue';

export default {
    name: 'AppMain',

    components: {
        MediaCard
    },

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
                category.page = 0;
            }).catch(error => {
                store.getMediaListError = true;
            });
        },

        getCurrentShownMedias(category) {
            const list = category.mediaList;
            let firstMediaInCurrentPageIndex = category.page * 5;
            let firstMediaInNextPageIndex = (category.page + 1) * 5 < list.length ? (category.page + 1) * 5 : undefined;

            return list.slice(firstMediaInCurrentPageIndex, firstMediaInNextPageIndex);
        }
    },

    created() {
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
                <li class="card" v-for="media in store.searchResult" :key="media.id">
                    <MediaCard :media="media" />
                </li>
            </ul>
        </template>
        <template v-else-if="categories[categories.length - 1]">
            <div class="category" v-for="(category, index) in categories" :key="index">
                <h2>
                    {{ category.title }}
                </h2>
                <ul class="media-list">
                    <li class="card" v-for="media in getCurrentShownMedias(category)" :key="media.id">
                        <MediaCard :media="media" />
                    </li>
                </ul>
            </div>
        </template>
        <template v-else>
            <div class="loading-screen">
                <img src="../assets/logo.png" alt="">
            </div>
        </template>
    </main>
</template>

<style lang="scss" scoped>
main {
    padding: 0 5%;

    .category {
        margin-bottom: 2rem;
    }

    h2 {
        color: $clr-neutral-ltr;
        font-size: 1.75vw;
        margin-bottom: .5rem;
    }

    .media-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;

        &:not(.search-results) {
            flex-wrap: nowrap;
        }

        .card {
            flex: 0 0 calc((100% - 4rem) / 5);
        }
    }

    .loading-screen {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50vw;
        max-width: 1000px;

        img {
            width: 100%;
            animation: glowing 5s infinite;
        }
    }
}

@keyframes glowing {
    0% {
        filter: drop-shadow(0 0 10px $clr-brand-primary);
    }

    50% {
        filter: drop-shadow(0 0 0 $clr-brand-primary);
    }

    100% {
        filter: drop-shadow(0 0 10px $clr-brand-primary);
    }
}
</style>