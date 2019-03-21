<template>
    <div class="columns is-multiline">
        <div class="column is-one-quarter" v-for="game in topRecent" :key="game.name">
            <game :game="game" ></game>
        </div>
        <button
            v-if="games.length > 8 * amountLoaded"
            @click="loadGames"
            class="button is-fullwidth is-warning"
        >Load more</button>
    </div>
</template>

<script>
import Game from "./Game.vue";
import { dateSort } from "@/Utils/sorting-utils.js";
import GameApi from "@/api/games.js";

export default {
    components: {
        Game
    },
    name: "GameList",
    props: {
        name: String,
        description: String,
        image: String
    },
    data() {
        return {
            games: null,
            gameArray: [],
            unmodifiedGames: [],
            amountLoaded: 1
        };
    },
    computed: {
        topRecent() {
            let toLoad = this.amountLoaded * 8;
            this.games = this.unmodifiedGames.sort(dateSort);
            return this.games.slice(0, toLoad);
        }
    },

    mounted() {
        GameApi.getGames()
            .then(games => {
                this.unmodifiedGames = games;
            })
            .catch(error => console.log(error))
            .finally(() => {});
    },

    methods: {
        loadGames() {
            if (this.amountLoaded * 8 < this.games.length) {
                this.amountLoaded++;
            }
        }
    }
};
</script>