<script>
export default {
    name: 'MediaCard',

    props: {
        media: Object
    },

    methods: {
        printVote() {
            const voteArray = []

            for (let charPrinted = 0, vote = this.media.vote_average; charPrinted < 5; charPrinted++) {
                if (vote > 1.5) {
                    voteArray.push(2);
                    vote = vote - 2;
                } else if (vote > .5) {
                    voteArray.push(1);
                    vote--;
                } else {
                    voteArray.push(0);
                }
            }

            return voteArray;
        }
    },

    computed: {
        getTitle() {
            if (media.media_type === 'movie') {
                return media.title;
            }
        }
    }
}
</script>

<template>
    <article class="media-container">
        <figure class="media-img">
            <img v-if="media.poster_path"
                 :src="'https://image.tmdb.org/t/p/w500/' + media.poster_path"
                 :alt="media.original_name">

            <span v-else>
                {{ media.original_name }}
            </span>
        </figure>

        <div class="media-infos">
            <div class="names-infos">
                <strong class="name">
                    {{ media.name }}
                    {{ media.title }}
                </strong>

                <span class="name">
                    {{ media.original_name }}
                    {{ media.original_title }}
                </span>
            </div>

            <div class="other-infos">
                <div class="vote icon-container">
                    <img :src="`src/assets/vote-icons/star-${voteSection}.png`"
                         v-for="(voteSection, index) in this.printVote()" :key="index">
                </div>

                <div class="country-and-lang">
                    <div class="language icon-container">
                        <img alt="media.original_language"
                             :src="`https://unpkg.com/language-icons/icons/${media.original_language}.svg`">
                    </div>

                    <div class="country icon-container">
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
.media-container {
    width: 100%;
    border-radius: .5rem;
    overflow: hidden;
    background-color: $clr-neutral-dkr;
    position: relative;
    font-size: 1.25vw;
    color: $clr-neutral-ltr;
    transition: all .25s;

    .media-img {
        width: 100%;
        aspect-ratio: 2 / 3;
        background-image: url(../assets/placeholder-poster.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        span {
            display: block;
            position: absolute;
            top: 15%;
            width: 100%;
            text-align: center;
            font-weight: 900;
        }
    }

    &:hover {
        transform: scale(1.25);
        z-index: 5;

        .media-img {
            filter: brightness(50%);
        }

        .media-infos {
            display: flex;
        }
    }

    .media-infos {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        padding: 1vw;
        display: none;
        flex-direction: column;
        justify-content: space-between;

        .names-infos {
            .name {
                display: block;
                margin-bottom: 1vw;
            }
        }

        .other-infos {
            .icon-container {
                height: 1.25vw;

                img {
                    height: 100%;
                }
            }

            .country-and-lang {
                display: flex;
                justify-content: space-between;
                margin-top: 1vw;
            }
        }
    }
}
</style>