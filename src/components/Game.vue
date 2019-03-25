<template>
    <div>
        <router-link :to="'/game/' + gameUrl">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">{{game.name}}</p>
                </header>
                <div class="card-image">
                    <figure class="image is-2by1">
                        <img v-bind:src="imageUrl" v-bind:alt="game.name">
                        <!-- <img src="@/assets/img.png"> -->
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">{{game.description}}</div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import { formatName } from "@/Utils/url-utils.js";
import { getImageUrl } from "@/Utils/url-utils.js";

export default {
    name: "Game",
    props: {
        game: Object
    },

    data() {
        return {};
    },
    computed: {
        gameUrl() {
            return formatName(this.game.name);
        },
        imageUrl() {
            if (this.game.image) {
                let url = getImageUrl(this.game.image);
                return this.$hostname + url;
            }
            // games that were saved without an image fall back
            // to manually created backgrounds
            else {
                let formattedName = formatName(this.game.name);
                return (
                    this.$hostname +
                    "/images/Backgrounds/" +
                    formattedName +
                    ".jpg"
                );
            }
        },
        image() {}
    },

    mounted() {},

    methods: {}
};
</script>

<style>
</style>
