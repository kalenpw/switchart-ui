<template>
    <div>
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
        this.$http
            .get(this.$hostname + "/api/artwork/user/" + this.$route.params.id)
            .then(response => {
                console.log(response.data);
                this.userUploads = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
};
</script>
