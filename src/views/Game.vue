<template>
    <div v-if="artworks">
        <section class="hero is-warning background">
            <div class="hero-body">
                <div v-if="game" class="container">
                    <h1 class="title">{{game.name}}</h1>
                    <h2 class="subtitle">{{game.description}}</h2>
                </div>
            </div>
        </section>

        <div class="section columns is-centered">
            <div class="column has-text-centered">
                <button
                    :class="artworks.isSortedDate() ? 'is-warning' : ''"
                    @click="sortByDate"
                    class="button"
                >
                    Recent
                    <i
                        :class="artworks.isReverseSorted && artworks.isSortedDate() ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                    ></i>
                </button>
                <button
                    :class="artworks.isSortedPopular() ? 'is-warning' : ''"
                    @click="sortByPopular"
                    class="button"
                >
                    Popular
                    <i
                        :class="artworks.isReverseSorted  && artworks.isSortedPopular() ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                    ></i>
                </button>
            </div>
        </div>

        <div v-if="artworks" class="columns is-multiline section">
            <Artwork
                v-for="artwork in artworks.visibleItems"
                v-bind:key="artwork.id"
                class="column is-one-quarter-desktop is-half-tablet"
                :id="artwork.id"
            ></Artwork>

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
import EventBus from "@/event-bus.js";
import LazyLoadedList from "@/Utils/LazyLoadedList.js";
import { dateSort } from "@/Utils/sorting-utils.js";
import { popularSort } from "@/Utils/sorting-utils.js";

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
                    this.artworks.sortBy(dateSort);
                }
            );
        },
        sortAlphabetically() {
            this.artworks.sortBy(alphabeticalSort);
        },
        sortByDate() {
            this.artworks.sortBy(dateSort);
        },
        sortByPopular() {
            this.artworks.sortBy(popularSort);
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
i {
    padding-left: 5px;
}
</style>
