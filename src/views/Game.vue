<template>
    <div class="home">
        <h1>Viewing game:</h1>
        {{ game.name }}
        <h2></h2>
        {{game.description}}
        <img v-bind:src="imageUrl" v-bind:alt="game.name">
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
    computed: {
        imageUrl() {
            console.log(this.game);
            return this.game.name.replace(/ /g, "_").replace(/\W/g, "");
        }
    },
    mounted() {
        this.$http
            .get(this.$hostname + "/api/games/" + this.$route.params.id)
            .then(response => {
                console.log(this.response.data);
                this.game = response.data;
            });
    }
};
</script>