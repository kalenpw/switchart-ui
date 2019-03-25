<template>
    <div class="columns is-multiline" v-if="games">
        <div class="column is-one-quarter" v-for="game in games.visibleItems" :key="game.name">
            <game :game="game"></game>
        </div>
        <button
            v-if="! games.hasLoadedAll()"
            @click="games.loadMore()"
            class="button is-fullwidth is-warning"
        >Load more</button>
    </div>
</template>

<script>
import Game from "./Game.vue";
import GameApi from "@/api/games.js";
import { dateSort } from "@/Utils/sorting-utils.js";
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

    methods: {}
};
</script>