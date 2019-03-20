<template>
    <a class="panel-block" :href="gameUrl">
        <span class="panel-icon has-text-black">
            <i class="fab fa-nintendo-switch" aria-hidden="true"></i>
        </span>
        {{game.name}}
        <span class="badge">{{artworks.length}}</span>
    </a>
</template>

<script>
import { formatName } from "@/Utils/url-utils.js";
import ArtworksApi from "@/api/artworks.js";

export default {
    name: "GameIndexVue",
    props: {
        game: Object
    },
    data() {
        return {
            artworks: []
        };
    },
    computed: {
        gameUrl() {
            this.$forceUpdate();
            console.log(this.game.artworkCount + " " + this.game.name);
            return "/game/" + formatName(this.game.name);
        }
    },
    mounted() {
        ArtworksApi.getArtworksByGame(formatName(this.game.name))
            .then(response => {
                this.artworks = response;
                console.log(this.artworks);
            })
            .catch(error => console.log(error));
    }
};
</script>

<style scoped>
.badge {
    margin-left: 10px;
    padding: 2px;
    border-radius: 100%;
    background-color: #ffdd57;
}
</style>
