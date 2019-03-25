<template>
    <div v-if="showModal" class="modal is-active">
        <div @click="hideModal" class="modal-background"></div>
        <div class="modal-content box has-text-centered">
            <figure class="is-inline-block">
                <img v-bind:src="artworkUrl">
            </figure>

            <a
                @click="showConfirmDelete = true"
                v-if="userUploaded"
                class="button is-danger is-fullwidth"
            >DELETE</a>

            <div v-if="showConfirmDelete" class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-content box">
                    <p>Would you really like to delete?</p>
                    <a
                        @click="handleDelete"
                        v-if="userUploaded"
                        class="button is-danger is-fullwidth"
                    >Yes</a>
                    <a
                        @click="showConfirmDelete = false"
                        v-if="userUploaded"
                        class="button is-fullwidth"
                    >No</a>
                </div>
            </div>
        </div>
        <button @click="hideModal" class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import { EventBus } from "@/event-bus.js";
import ArtworkApi from "@/api/artworks.js";
import UserApi from "@/api/users.js";
import { getImageUrl } from "@/Utils/url-utils.js";

export default {
    name: "ArtworkDetails",
    props: {
        artworkId: Number
    },
    components: {},
    data() {
        return {
            showModal: true,
            artwork: null,
            showConfirmDelete: false,
            user: null
        };
    },
    computed: {
        artworkUrl() {
            if (this.artwork) {
                return this.$hostname + getImageUrl(this.artwork.fileName);
            }
        },
        userUploaded() {
            if (this.user && this.artwork) {
                if (this.user.id == this.artwork.userId) {
                    return true;
                }
            }
            return false;
        }
    },
    methods: {
        hideModal() {
            EventBus.$emit("close-modal");
        },
        updateArtworkUrl() {
            return this.$hostname + getImageUrl(this.artwork.fileName);
        },
        handleDelete() {
            console.log("deleting");
            ArtworkApi.deleteArtwork(
                localStorage.getItem("jwt"),
                this.artworkId
            )
                .then(response => {
                    console.log(response);
                    this.showConfirmDelete = false;
                    this.showModal = false;
                    EventBus.$emit("flash-message", {
                        selfDestruct: true,
                        message: "Deleted artwork."
                    });
                    EventBus.$emit("artwork-deleted");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        ArtworkApi.getArtworkById(this.artworkId)
            .then(response => {
                this.artwork = response;
            })
            .catch(error => console.log(error));
        UserApi.getLoggedInUser().then(response => (this.user = response));
    }
};
</script>