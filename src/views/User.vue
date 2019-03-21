<template>
    <div>
        <section class="hero is-warning">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{{username}}'s uploads</h1>
                </div>
            </div>
        </section>

        <div class="section">
            <div class="columns is-multiline">
                <div
                    class="column is-one-quarter"
                    v-for="artwork in visibleUploads"
                    :key="artwork.id"
                >
                    <Artwork :id="artwork.id"></Artwork>
                </div>
            </div>

            <button
                v-if="userUploads.length > 8 * amountLoaded"
                @click="loadGames"
                class="button is-fullwidth is-warning"
            >Load more</button>
        </div>
    </div>
</template>

<script>
import Artwork from "@/components/Artwork.vue";
import ArtworkApi from "@/api/artworks.js";

export default {
    name: "user",
    components: {
        Artwork
    },
    data() {
        return {
            userUploads: [],
            amountLoaded: 1
        };
    },
    computed: {
        username() {
            return this.$route.params.id;
        },
        visibleUploads() {
            let toLoad = this.amountLoaded * 8;
            return this.userUploads.slice(0, toLoad);
        }
    },
    mounted() {
        ArtworkApi.getArtworksByUser(this.$route.params.id)
            .then(response => {
                this.userUploads = response.reverse();
            })
            .catch(error => {
                console.log(error);
                window.location.href = "/404";
            });
    },
    methods:{
        loadGames(){
            this.amountLoaded++;
        }
    }
};
</script>
