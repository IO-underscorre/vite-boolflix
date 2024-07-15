<script>
import { store } from '../store';

import axios from 'axios';

export default {
    name: 'AppHeader',

    data() {
        return {
            store,

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
        <a class="logo">
            <img src="../assets/logo.png" alt="Boolflix">
        </a>
        <input type="text" v-model="searchBarContent" @input="searchCard()">
    </header>
</template>

<style lang="scss" scoped>
header {
    position: sticky;
    width: 100%;
    height: 4.5rem;
    padding: 0 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(to bottom, $clr-trasparent-black-50, $clr-trasparent-black);

    .logo {
        display: block;
        height: 50%;
        color: $clr-brand-primary;

        img {
            height: 100%;
        }
    }

    h1 {
        font-size: 3rem;
        line-height: 1;
        font-weight: 500;
    }
}
</style>