<template>
    <a class="panel-block" :href="gameUrl">
        <span class="panel-icon has-text-black">
            <i class="fab fa-nintendo-switch" aria-hidden="true"></i>
        </span>
        {{game.name}}
        <span class="tag is-warning is-rounded">{{game.artworks.length}}</span>
    </a>
</template>

<script>
import { formatName } from "@/Utils/url-utils.js";

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
            return "/game/" + formatName(this.game.name);
        }
    },
};
</script>

<style scoped>
.tag {
    margin-left: 10px;
}
</style>
