<template>
    <div class="columns is-multiline">
        <div class="column" v-for="game in this.orderedGames" :key="game.name">
            <game :name="game.title" :description="game.description" :image="game.background_url"></game>
        </div>
    </div>
</template>

<script>
import Game from "./Game.vue";
import axios from "axios";

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
            api_url: "http://localhost:8000"
        };
    },
    computed: {
        orderedGames() {
            return this.games;
        }
    },

    mounted() {
        axios
            .get(this.api_url + "/api/games")
            .then(response => (this.games = response.data));
    },

    methods: {}
};
</script>

<style scoped>
</style>
