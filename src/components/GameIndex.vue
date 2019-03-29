<template>
    <nav v-if="games" class="panel">
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
            <a :class="games.isSortedAlphabetically() ? 'is-active' : ''" @click="sortAlphabetical">
                Alphabetical
                <i
                    :class="games.isReverseSorted && games.isSortedAlphabetically() ? upArrow : downArrow"
                ></i>
            </a>
            <a :class="games.isSortedDate() ? 'is-active' : ''" @click="sortRecent">
                Latest
                <i
                    :class="games.isReverseSorted && games.isSortedDate() ? upArrow : downArrow"
                ></i>
            </a>
            <a :class="games.isSortedPopular() ? 'is-active' : ''" @click="sortPopular">
                Popular
                <i
                    :class="games.isReverseSorted && games.isSortedPopular() ? upArrow : downArrow"
                ></i>
            </a>
        </p>
        <GameIndexItem v-for="game in games.visibleItems" v-bind:key="game.id" :game="game"></GameIndexItem>
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
import LazyLoadedList from "@/Utils/LazyLoadedList.js";

export default {
    name: "GameIndex",
    components: {
        GameIndexItem
    },
    data() {
        return {
            searchText: "",
            games: null,
            upArrow: "fas fa-caret-up",
            downArrow: "fas fa-caret-down",
        };
    },
    computed: {},
    mounted() {
        GameApi.getGames()
            .then(games => {
                this.games = new LazyLoadedList(games);
                this.games.loadAll();
                this.games.sortBy(alphabeticalSort);
            })
            .catch(error => console.log(error))
            .finally(() => {});
    },
    methods: {
        filterSearch() {
            this.games.visibleItems = this.games.allItems;
            this.games.visibleItems = this.games.visibleItems.filter(game =>
                game.name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
        sortAlphabetical() {
            this.games.sortBy(alphabeticalSort);
        },
        sortRecent() {
            this.games.sortBy(dateSort);
        },
        sortPopular() {
            this.games.sortBy(popularSort);
        }
    }
};
</script>

<style scoped>
.panel-tabs a i {
    padding-left: 4px;
}
</style>
