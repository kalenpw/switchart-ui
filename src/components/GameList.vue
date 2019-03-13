<template>
    <div class="columns is-multiline">
        <div class="column is-one-quarter" v-for="game in topRecent" :key="game.name">
            <game :name="game.title" :description="game.description" :image="game.background_url"></game>
        </div>
    </div>
</template>

<script>
import Game from "./Game.vue";
import axios from "axios";
import {dateSort} from "@/Utils/sorting-utils.js";

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
            unmodifiedGames: []
        };
    },
    computed: {
        topRecent(){
            this.games = this.unmodifiedGames.sort(dateSort);
            return this.games.slice(0, 8);
        }
    },

    mounted() {
        axios.get(this.$hostname + "/api/games").then(response => {
            this.games = response.data;
            for (let i in this.games) {
                this.gameArray.push(this.games[i]);
            }
            this.unmodifiedGames = this.gameArray;
        });
    },

    methods: {}
};
</script>

<style scoped>
</style>
