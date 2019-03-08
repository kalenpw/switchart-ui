<template>
    <div class="columns">
        <div class="column" v-for="game in games" :key="game.name">
            <game
                :name="game.name"
                :description="game.description" 
                :image="game.image"
            ></game>
        </div>
    </div>
</template>

<script>
import Game from "./Game.vue";
import allGames from "../assets/games.js";

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
            games: allGames
        };
    },
    computed: {
        imageUrl() {}
    },

    mounted() {},

    methods: {}
};
</script>

<style scoped>
</style>
