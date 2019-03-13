<template>
    <div class="home">
        <h1>Viewing game:</h1>
        {{ game.title }}
        <h2></h2>
        {{game.description}}
        <img v-bind:src="game.background_url" v-bind:alt="game.name">
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "game",
    components: {},
    data() {
        return {
            game: null
        };
    },
    mounted() {
        axios
            .get(this.$hostname + "/api/games/name/" + this.$route.params.id)
            .then(response => (this.game = response.data));
    }
};
</script>