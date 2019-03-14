<template>
    <div>
        <div class="card">
            <div class="card-image">
                <h1></h1>
                <figure class="image is-2by1">
                    <img v-bind:src="artworkUrl">
                    <!-- <img src="@/assets/img.png"> -->
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Game",
    props: {
        id: 0
    },

    data() {
        return {
            artwork: null,
        };
    },
    computed: {
        artworkUrl() {
            if (this.artwork) {
                let base = this.$hostname + "/storage/";
                let fileName = this.artwork.fileName;
                let split = fileName.split("/");
                //the database fileName has an extra public we need to drop
                split = split.splice(1, split.length - 1);
                let url = base + split.join("/");
                console.log(url);
                return url;
            }
        }
    },

    mounted() {
        this.$http
            .get(this.$hostname + "/api/artwork/id/" + this.id)
            .then(response => {
                console.log(response.data);
                this.artwork = response.data;
            });
    },

    methods: {}
};
</script>

<style>
</style>
