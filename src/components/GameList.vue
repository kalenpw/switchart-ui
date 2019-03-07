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
            games: [
                {
                    name: "Splatoon 2",
                    description: "Squid frenzy",
                    image:
                        "http://switchart.tk/images/Backgrounds/Splatoon_2.jpg"
                },
                {
                    name: "Arms",
                    description: "Dumb shit",
                    image: "http://switchart.tk/images/Backgrounds/Arms.jpg"
                }
            ]
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
