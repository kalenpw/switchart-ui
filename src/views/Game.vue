<template>
    <div>
        <section class="hero is-warning background">
            <div class="hero-body">
                <div v-if="game" class="container">
                    <h1 class="title">{{game.name}}</h1>
                    <h2 class="subtitle">{{game.description}}</h2>
                </div>
            </div>
        </section>

        <div v-if="artworks" class="columns is-multiline section">
            <div
                class="column is-one-quarter"
                v-for="artwork in artworks.visibleItems"
                :key="artwork.id"
            >
                <Artwork :id="artwork.id"></Artwork>
            </div>

            <button
                v-if="!artworks.hasLoadedAll()"
                @click="artworks.loadMore()"
                class="button is-fullwidth is-warning"
            >Load more</button>
        </div>
    </div>
</template>

<script>
import Artwork from "@/components/Artwork.vue";
import GameApi from "@/api/games.js";
import ArtworkApi from "@/api/artworks.js";
import { EventBus } from "@/event-bus.js";
import LazyLoadedList from "@/Utils/LazyLoadedList.js";

export default {
    name: "game",
    components: {
        Artwork
    },
    data() {
        return {
            game: null,
            artworks: null
        };
    },
    computed: {},
    methods: {
        refreshArtworks() {
            ArtworkApi.getArtworksByGame(this.$route.params.id).then(
                response => {
                    this.artworks = new LazyLoadedList(response);
                    this.artworks.reverse();
                }
            );
        }
    },
    mounted() {
        GameApi.getGameByName(this.$route.params.id).then(response => {
            this.game = response;
        });
        this.refreshArtworks();
    },
    created() {
        EventBus.$on("artwork-deleted", () => {
            this.refreshArtworks();
        });
    }
};
</script>

<style scoped>
</style>