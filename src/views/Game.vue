<template>
    <div>
        <!-- <figure class="image is-3-by-1 background">
            <img :src="bannerUrl">
        </figure>-->
        <section class="hero is-warning background">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{{game.name}}</h1>
                    <h2 class="subtitle">{{game.description}}</h2>
                </div>
            </div>
        </section>
        <!-- <img v-bind:src="imageUrl" v-bind:alt="game.name"> -->
        <div class="columns is-multiline section">
            <div class="column is-one-quarter" v-for="artwork in artworks" :key="artwork.id">
                <Artwork :id="artwork.id"></Artwork>
                <!-- <game :name="game.title" :description="game.description" :image="game.background_url"></game> -->
            </div>
        </div>
    </div>
</template>

<script>
import Artwork from "@/components/Artwork.vue";
import GameApi from "@/api/games.js";
import ArtworkApi from "@/api/artworks.js";
import { EventBus } from "@/event-bus.js";

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
            if (this.game) {
                let formattedName = this.game.name
                    .replace(/ /g, "_")
                    .replace(/\W/g, "");
                return (
                    this.$hostname +
                    "/images/Backgrounds/" +
                    formattedName +
                    ".jpg"
                );
            }
        },
        bannerUrl() {
            if (this.game) {
                let formattedName = this.game.name
                    .replace(/ /g, "_")
                    .replace(/\W/g, "");
                return (
                    this.$hostname + "/images/Banners/" + formattedName + ".png"
                );
            }
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
    methods: {
        refreshArtworks() {
            ArtworkApi.getArtworksByGame(this.$route.params.id).then(
                response => {
                    this.artworks = response;
                }
            );
        }
    },
    mounted() {
        GameApi.getGameByName(this.$route.params.id).then(response => {
            this.game = response;
        });
        ArtworkApi.getArtworksByGame(this.$route.params.id).then(response => {
            this.artworks = response;
        });
    },
    created() {
        EventBus.$on("artwork-deleted", () => {
            this.refreshArtworks();
        });
    }
};
</script>

<style scoped>
.background {
    /* position: absolute; */
    /* background-image: url("http://localhost:8000/images/Banners/Splatoon_2.png"); */
}
</style>