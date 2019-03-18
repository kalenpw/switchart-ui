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

        <a class="panel-block" v-for="game in games" v-bind:key="game.name">
            <span class="panel-icon has-text-black">
                <i class="fab fa-nintendo-switch" aria-hidden="true"></i>
            </span>
            {{game.name}}
        </a>
        <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth">reset all filters</button>
        </div>
    </nav>
</template>

<script>
import axios from "axios";
import { alphabeticalSort } from "@/Utils/sorting-utils.js";
import { dateSort } from "@/Utils/sorting-utils.js";
import { formatName } from "@/Utils/url-utils.js";
import GameApi from "@/api/games.js";

export default {
    name: "GameIndex",
    components: {},
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
    computed: {},
    mounted() {
        GameApi.getGames()
            .then(games => {
                this.games = games.sort(alphabeticalSort);
                this.games = games;
                this.allGames = this.games;
            })
            .catch(error => console.log(error))
            .finally(() => {});
    },
    methods: {
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
            this.toggleSortStates("popular");
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