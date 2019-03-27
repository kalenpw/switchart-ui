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
            <a :class="isAlphSort ? 'is-active' : ''" @click="sortAlphabetical">
                Alphabetical
                <i :class="alphabeticalArrow"></i>
            </a>
            <a :class="isRecentSort ? 'is-active' : ''" @click="sortRecent">
                Latest
                <i :class="recentArrow"></i>
            </a>
            <a :class="isPopularSort ? 'is-active' : ''" @click="sortPopular">
                Popular
                <i :class="popularArrow"></i>
            </a>
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
            isPopularSort: false,
            alphabeticalArrow: "fas fa-caret-down",
            recentArrow: "fas fa-caret-down",
            popularArrow: "fas fa-caret-down"
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
            this.toggleArrow("alphabetical");
            if (this.isAlphSort) {
                this.games.reverse();
            } else {
                this.toggleSortStates("alphabetical");
                this.games = this.allGames.slice().sort(alphabeticalSort);
            }
        },
        sortRecent() {
            this.toggleArrow("recent");
            if (this.isRecentSort) {
                this.games.reverse();
            } else {
                this.toggleSortStates("recent");
                this.games = this.allGames.slice().sort(dateSort);
            }
        },
        sortPopular() {
            this.toggleArrow("popular");
            if (this.isPopularSort) {
                this.games.reverse();
            } else {
                this.toggleSortStates("popular");
                this.games = this.allGames.slice().sort(popularSort);
            }
        },
        toggleArrow(sortMethod) {
            const ARROW_UP_CLASS = "fas fa-caret-up";
            const ARROW_DOWN_CLASS = "fas fa-caret-down";
            if (sortMethod == "alphabetical") {
                if (this.alphabeticalArrow == ARROW_UP_CLASS) {
                    this.alphabeticalArrow = ARROW_DOWN_CLASS;
                } else {
                    this.alphabeticalArrow = ARROW_UP_CLASS;
                }
            } else if (sortMethod == "popular") {
                if (this.popularArrow == ARROW_UP_CLASS) {
                    this.popularArrow = ARROW_DOWN_CLASS;
                } else {
                    this.popularArrow = ARROW_UP_CLASS;
                }
            } else if (sortMethod == "recent") {
                if (this.recentArrow == ARROW_UP_CLASS) {
                    this.recentArrow = ARROW_DOWN_CLASS;
                } else {
                    this.recentArrow = ARROW_UP_CLASS;
                }
            }
        },
        toggleSortStates(activeSort) {
            this.isAlphSort = false;
            this.isRecentSort = false;
            this.isPopularSort = false;
            if (activeSort == "alphabetical") {
                this.isAlphSort = true;
            } else if (activeSort == "popular") {
                this.isPopularSort = true;
            } else if (activeSort == "recent") {
                this.isRecentSort = true;
            }
        }
    }
};
</script>

<style scoped>
.panel-tabs a i {
    padding-left: 4px;
}
</style>
