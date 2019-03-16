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
            <footer class="card-footer">
                <a @click="upvote" class="card-footer-item">
                    <i class="fas fa-arrow-up"></i>
                </a>
                <a class="card-footer-item">{{voteCount}}</a>
                <a @click="downvote" class="card-footer-item">
                    <i class="fas fa-arrow-down"></i>
                </a>
            </footer>
        </div>
    </div>
</template>

<script>
import { EventBus } from "@/event-bus.js";

export default {
    name: "Game",
    props: {
        id: 0
    },

    data() {
        return {
            artwork: null,
            voteCount: 0
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
                this.artwork = response.data;
            });
        this.refreshVotes();
    },

    methods: {
        upvote() {
            this.$http
                .post(this.$hostname + "/api/vote/upvote/", {
                    token: localStorage.getItem("jwt"),
                    artworkId: this.id
                })
                .then(response => {
                    console.log(response.data);
                    this.refreshVotes();
                })
                .catch(error => {
                    EventBus.$emit("flash-message", {selfDestruct: true, message: "Please login/sign up before voting."});
                    console.log(error);
                });
        },
        downvote() {
            this.$http
                .post(this.$hostname + "/api/vote/downvote/", {
                    token: localStorage.getItem("jwt"),
                    artworkId: this.id
                })
                .then(response => {
                    console.log(response.data);
                    this.refreshVotes();
                })
                .catch(error => console.log(error));
        },
        refreshVotes() {
            this.$http
                .get(this.$hostname + "/api/vote/artwork/" + this.id)
                .then(response => {
                    this.voteCount = response.data;
                })
                .catch(error => console.log(error));
        }
    }
};
</script>

<style>
</style>
