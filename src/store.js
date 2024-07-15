import { reactive } from "vue";

export const store = reactive({
    searchResult: [],
    apiURL: 'https://api.themoviedb.org/3/',
    apiKeyString: 'api_key=6847b051754a666820fc950d16470e42',
    searchError: false
});