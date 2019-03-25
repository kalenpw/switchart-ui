<template>
    <div>
        <div class="card">
            <a @click="showModal">
                <div class="card-image has-text-centered">
                    <figure class="is-inline-block">
                        <img v-bind:src="artworkUrl" class="sa-card-image">
                    </figure>
                </div>
            </a>
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
        <ArtworkDetails v-if="showDetails" :artworkId="id"></ArtworkDetails>
    </div>
</template>

<script>
import ArtworkDetails from "@/components/ArtworkDetails.vue";
import { EventBus } from "@/event-bus.js";
import { getImageUrl } from "@/Utils/url-utils.js";
import VoteApi from "@/api/votes.js";
import ArtworkApi from "@/api/artworks.js";
import UserApi from "@/api/users.js";

export default {
    name: "Game",
    props: {
        id:{
            type: Number,
            default: 0
        }
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
                return this.$hostname + getImageUrl(this.artwork.fileName);
            }
            //TODO placeholder image
            return "";
        }
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
                .then(() => {
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
                .then(() => {
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
.sa-card-image{
    max-height: 300px;
}
</style>
