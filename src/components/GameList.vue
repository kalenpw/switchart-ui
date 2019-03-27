<template>
    <div v-if="games">
        <div class="columns is-centered">
            <div class="column has-text-centered">
                <button
                    :class="games.isSortedAlphabetically() ? 'is-warning' : ''"
                    @click="sortAlphabetically"
                    class="button"
                >
                    Alphabetical
                    <i
                        :class="games.isReverseSorted && games.isSortedAlphabetically() ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                    ></i>
                </button>
                <button
                    :class="games.isSortedDate() ? 'is-warning' : ''"
                    @click="sortByDate"
                    class="button"
                >
                    Recent
                    <i
                        :class="games.isReverseSorted && games.isSortedDate() ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                    ></i>
                </button>
                <button
                    :class="games.isSortedPopular() ? 'is-warning' : ''"
                    @click="sortByPopular"
                    class="button"
                >
                    Popular
                    <i
                        :class="games.isReverseSorted  && games.isSortedPopular() ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                    ></i>
                </button>
            </div>
        </div>
        <div class="columns is-multiline">
            <Game
                class="column is-one-quarter"
                v-for="game in games.visibleItems"
                :key="game.name"
                :game="game"
            ></Game>
            <button
                v-if="! games.hasLoadedAll()"
                @click="games.loadMore()"
                class="button is-fullwidth is-warning"
            >Load more</button>
        </div>
    </div>
</template>

<script>
import Game from "./Game.vue";
import GameApi from "@/api/games.js";
import { dateSort } from "@/Utils/sorting-utils.js";
import { alphabeticalSort } from "@/Utils/sorting-utils.js";
import { popularSort } from "@/Utils/sorting-utils.js";
import LazyLoadedList from "@/Utils/LazyLoadedList.js";

export default {
    components: {
        Game
    },
    name: "GameList",
    props: {},
    data() {
        return {
            games: null,
            isReverse: false,
        };
    },

    mounted() {
        GameApi.getGames()
            .then(games => {
                this.games = new LazyLoadedList(games);
                this.games.sortBy(dateSort);
            })
            .catch(error => console.log(error))
            .finally(() => {});
    },

    methods: {
        sortAlphabetically() {
            this.games.sortBy(alphabeticalSort);
        },
        sortByDate() {
            this.games.sortBy(dateSort);
        },
        sortByPopular() {
            this.games.sortBy(popularSort);
        },
    }
};
</script>

<style scoped>
i{
    padding-left: 5px;
}
</style>
