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
            let formattedName = this.game.name.replace(/ /g, "_").replace(/\W/g, "");
            return  this.$hostname + "/images/Backgrounds/" + formattedName + ".jpg";
        }
    },
    mounted() {
        this.$http
            .get(this.$hostname + "/api/games/" + this.$route.params.id)
            .then(response => {
                this.game = response.data;
            });
    }
};
</script>