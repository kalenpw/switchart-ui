<template>
    <div class="home">
        <h1>Viewing game:</h1>
        {{ game.name }}
        <h2></h2>
        {{game.description}}
        <!-- <img v-bind:src="imageUrl" v-bind:alt="game.name"> -->

        <div class="columns is-multiline">
            <div class="column is-one-quarter" v-for="artwork in artworks" :key="artwork.id">
                <Artwork :id="artwork.id"></Artwork>
                <!-- <game :name="game.title" :description="game.description" :image="game.background_url"></game> -->
            </div>
        </div>
    </div>
</template>

<script>
import Artwork from "@/components/Artwork.vue";

export default {
    name: "game",
    components: {
        Artwork
    },
    data() {
        return {
            game: null,
            artworks: []
        };
    },
    computed: {
        imageUrl() {
            let formattedName = this.game.name
                .replace(/ /g, "_")
                .replace(/\W/g, "");
            return (
                this.$hostname + "/images/Backgrounds/" + formattedName + ".jpg"
            );
        },
        artworkUrls() {
            let allUrls = [];
            for (let i = 0; i < this.artworks.length; i++) {
                let base = this.$hostname + "/storage/";
                let fileName = this.artworks[i].fileName;
                let split = fileName.split("/");
                //the database fileName has an extra public we need to drop
                split = split.splice(1, split.length - 1);
                let url = base + split.join("/");
                allUrls.push(url);
            }
            return allUrls;
        }
    },
    mounted() {
        this.$http
            .get(this.$hostname + "/api/games/" + this.$route.params.id)
            .then(response => {
                this.game = response.data;
            });

        this.$http
            .get(this.$hostname + "/api/artwork/game/" + this.$route.params.id)
            .then(response => {
                console.log(response.data);
                this.artworks = response.data;
            });
    }
};
</script>