<template>
    <div class="section">
        <h1>viewing user:</h1>

        {{username}}
        <div class="columns is-multiline">
            <div class="column is-one-quarter" v-for="artwork in userUploads" :key="artwork.id">
                <Artwork :id="artwork.id"></Artwork>
            </div>
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
            userUploads: []
        };
    },
    computed: {
        username() {
            if (this.$route.params.id === localStorage.username) {
                return localStorage.username;
            }
        }
    },
    mounted() {
        ArtworkApi.getArtworksByUser(this.$route.params.id)
            .then(response => {
                this.userUploads = response;
            })
            .catch(error => {
                console.log(error);
            });
    }
};
</script>
