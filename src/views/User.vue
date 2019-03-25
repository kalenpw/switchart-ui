<template>
    <div>
        <section class="hero is-warning">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{{username}}'s uploads</h1>
                </div>
            </div>
        </section>

        <div v-if="userUploads" class="section">
            <div class="columns is-multiline">
                <div
                    class="column is-one-quarter"
                    v-for="artwork in userUploads.visibleItems"
                    :key="artwork.id"
                >
                    <Artwork :id="artwork.id"></Artwork>
                </div>
            </div>

            <button
                v-if="! userUploads.hasLoadedAll()"
                @click="userUploads.loadMore()"
                class="button is-fullwidth is-warning"
            >Load more</button>
        </div>
    </div>
</template>

<script>
import Artwork from "@/components/Artwork.vue";
import ArtworkApi from "@/api/artworks.js";
import LazyLoadedList from "@/Utils/LazyLoadedList.js";

export default {
    name: "user",
    components: {
        Artwork
    },
    data() {
        return {
            userUploads: null
        };
    },
    computed: {
        username() {
            return this.$route.params.id;
        }
    },
    mounted() {
        ArtworkApi.getArtworksByUser(this.username)
            .then(response => {
                this.userUploads = new LazyLoadedList(response);
                this.userUploads.reverse();
            })
            .catch(error => {
                console.log(error);
                window.location.href = "/404";
            });
    }
};
</script>
