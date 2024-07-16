<script>
import { store } from '../store';

import axios from 'axios';

export default {
    name: 'AppHeader',

    data() {
        return {
            store,

            navBarLinks: [
                {
                    text: 'Home',
                    URL: '#'
                },
                {
                    text: 'TV Shows',
                    URL: '#'
                },
                {
                    text: 'Movies',
                    URL: '#'
                },
                {
                    text: 'New & Popular',
                    URL: '#'
                },
                {
                    text: 'My List',
                    URL: '#'
                },
                {
                    text: 'Browse by Languages',
                    URL: '#'
                }
            ],

            searchBarContent: ''
        }
    },

    methods: {
        searchCard() {
            if (this.searchBarContent.replace(/\s/g, '').length) {
                let searchApiURL = store.apiURL + 'search/multi?' + store.apiKeyString + '&query=' + this.searchBarContent;
                axios.get(searchApiURL).then(callReturn => {
                    store.searchResult = callReturn.data.results.filter((item) => item.media_type !== "person");
                    store.searchError = false;
                }).catch(error => {
                    store.searchError = true;
                });
            } else {
                store.searchResult = [];
            }
        }
    }
}
</script>

<template>
    <header>
        <nav class="top-bar">
            <a href="#" class="logo">
                <img src="../assets/logo.png" alt="Boolflix">
            </a>

            <menu class="links">
                <li v-for="links in navBarLinks">
                    <a :href="links.URL">
                        {{ links.text }}
                    </a>
                </li>
            </menu>

            <div class="search-side">
                <div class="search-bar">
                    <input type="text" placeholder="Search" v-model="searchBarContent" @input="searchCard()">

                    <span class="empty-button" @click="searchBarContent = '', searchCard()">
                        &#9587;
                    </span>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
header {
    padding-top: 4.5rem;

    .top-bar {
        position: fixed;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 4.5rem;
        padding: 0 5%;
        @include flex-space-between-center;
        gap: 2.5rem;
        background: linear-gradient(to bottom, $clr-trasparent-black-50, $clr-trasparent-black);
        color: $clr-neutral-ltst;
        font-size: 1vw;

        .logo {
            display: block;
            height: 50%;
            color: $clr-brand-primary;

            img {
                height: 100%;
            }
        }

        .links {
            @include flex-space-between-center;
            gap: 1rem;
            margin-right: auto;

            li {
                transition: color 1s;

                &:hover {
                    color: $clr-neutral;
                }
            }
        }

        .search-side {
            height: 100%;
            @include flex-space-between-center;

            .search-bar {
                padding: .25rem;
                border: 2px solid $clr-neutral-ltst;
                color: $clr-neutral-ltst;
                background-color: $clr-brand-secondary;

                input {
                    appearance: none;
                    outline: none;
                    border: none;
                    color: inherit;
                    font-size: inherit;
                    background-color: $clr-trasparent-black;
                    padding-right: .25rem;

                    ::placeholder {
                        color: $clr-neutral;
                    }
                }

                .empty-button {
                    cursor: pointer;
                    user-select: none;
                }
            }
        }
    }
}
</style>