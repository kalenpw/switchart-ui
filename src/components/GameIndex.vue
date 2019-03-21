<template>
    <nav class="panel">
        <p class="panel-heading">Games</p>
        <div class="panel-block">
            <p class="control has-icons-left">
                <input
                    v-model="searchText"
                    @keyup="filterSearch"
                    class="input"
                    type="text"
                    placeholder="search"
                >
                <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </span>
            </p>
        </div>
        <p class="panel-tabs">
            <a :class="isAlphSort ? 'is-active' : ''" @click="sortAlphabetical">Alphabetical</a>
            <a :class="isRecentSort ? 'is-active' : ''" @click="sortRecent">Latest</a>
            <a :class="isPopularSort ? 'is-active' : ''" @click="sortPopular">Popular</a>
        </p>
        <GameIndexItem v-for="game in games" v-bind:key="game.id" :game="game"></GameIndexItem>

    </nav>
</template>

<script>
import { alphabeticalSort } from "@/Utils/sorting-utils.js";
import { dateSort } from "@/Utils/sorting-utils.js";
import { popularSort } from "@/Utils/sorting-utils.js";

import { formatName } from "@/Utils/url-utils.js";

import GameApi from "@/api/games.js";
import ArtworkApi from "@/api/artworks.js";
import GameIndexItem from "@/components/GameIndexItem.vue";

export default {
    name: "GameIndex",
    components: {
        GameIndexItem
    },
    data() {
        return {
            searchText: "",
            games: [],
            allGames: [],
            isAlphSort: true,
            isRecentSort: false,
            isPopularSort: false
        };
    },
    computed: {
        detailsUrl() {
            let base = this.$hostname;
            let url = formatName();
        }
    },
    mounted() {
        GameApi.getGames()
            .then(games => {
                this.games = games;
                this.allGames = this.games;
                this.getArtworkCounts();
            })
            .catch(error => console.log(error))
            .finally(() => {});
    },
    methods: {
        getArtworkCounts() {
            for (let i = 0; i < this.games.length; i++) {
                ArtworkApi.getArtworksByGame(formatName(this.games[i].name))
                    .then(response => {
                        this.games[i].artworkCount = response.length;
                    })
                    .catch(error => console.log(error));
            }
        },
        filterSearch() {
            this.games = this.allGames;
            this.games = this.games.filter(game =>
                game.name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
        sortAlphabetical() {
            if (this.isAlphSort) {
                this.games.reverse();
            } else {
                this.toggleSortStates("alphabetical");
                this.games = this.allGames.slice().sort(alphabeticalSort);
            }
        },
        sortRecent() {
            if (this.isRecentSort) {
                this.games.reverse();
            } else {
                this.toggleSortStates("recent");
                this.games = this.allGames.slice().sort(dateSort);
            }
        },
        sortPopular() {
            if (this.isPopularSort) {
                this.games.reverse();
            } else {
                this.toggleSortStates("popular");
                this.games = this.allGames.slice().sort(popularSort);
            }
        },

        toggleSortStates(activeSort) {
            if (activeSort == "alphabetical") {
                this.isAlphSort = true;
                this.isRecentSort = false;
                this.isPopularSort = false;
            } else if (activeSort == "popular") {
                this.isAlphSort = false;
                this.isRecentSort = false;
                this.isPopularSort = true;
            } else if (activeSort == "recent") {
                this.isAlphSort = false;
                this.isRecentSort = true;
                this.isPopularSort = false;
            }
        }
    }
};
</script>