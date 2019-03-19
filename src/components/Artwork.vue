<template>
    <div>
        <a @click="showModal">
            <div class="card">
                <div class="card-image">
                    <h1></h1>
                    <figure class="image is-2by1">
                        <img v-bind:src="artworkUrl">
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
        </a>
        <ArtworkDetails v-if="showDetails" :artworkId="id"></ArtworkDetails>
    </div>
</template>

<script>
import ArtworkDetails from "@/components/ArtworkDetails.vue";
import { EventBus } from "@/event-bus.js";
import { getArtworkUrl } from "@/Utils/url-utils.js";
import VoteApi from "@/api/votes.js";
import ArtworkApi from "@/api/artworks.js";
import UserApi from "@/api/users.js";


export default {
    name: "Game",
    props: {
        id: 0
    },
    components: {
        ArtworkDetails
    },
    data() {
        return {
            artwork: null,
            voteCount: 0,
            user: null,
            showDetails: false
        };
    },
    computed: {
        artworkUrl() {
            if (this.artwork) {
                return this.$hostname + getArtworkUrl(this.artwork.fileName);
            }
        },
    },

    mounted() {
        ArtworkApi.getArtworkById(this.id).then(response => {
            this.artwork = response;
        });
        this.refreshVotes();

        UserApi.getLoggedInUser().then(response => (this.user = response));
    },

    methods: {
        upvote() {
            VoteApi.upvote(localStorage.getItem("jwt"), this.id)
                .then(response => {
                    this.refreshVotes();
                })
                .catch(error => {
                    EventBus.$emit("flash-message", {
                        selfDestruct: true,
                        message: "Please login/sign up before voting."
                    });
                    console.log(error);
                });
        },
        downvote() {
            VoteApi.downvote(localStorage.getItem("jwt"), this.id)
                .then(response => {
                    this.refreshVotes();
                })
                .catch(error => {
                    EventBus.$emit("flash-message", {
                        selfDestruct: true,
                        message: "Please login/sign up before voting."
                    });
                    console.log(error);
                });
        },
        refreshVotes() {
            VoteApi.getVotesForArtwork(this.id)
                .then(response => {
                    this.voteCount = response;
                })
                .catch(error => console.log(error));
        },
        handleDelete() {
            console.log("deleting");
        },
        showModal() {
            this.showDetails = true;
        }
    },
    created() {
        EventBus.$on("close-modal", () => {
            this.showDetails = false;
        });
    }
};
</script>

<style scoped>
</style>
