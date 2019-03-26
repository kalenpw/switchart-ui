<template>
    <div>
        <div class="columns is-centered">
            <div class="column has-text-centered">
                <button @click="sortAlphabetically" class="button">Alphabetical</button>
                <button @click="sortByDate" class="button">Recent</button>
                <button @click="sortByPopular" class="button">Popular</button>
            </div>
        </div>
        <div class="columns is-multiline" v-if="games">
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
            games: null
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
        }
    }
};
</script>