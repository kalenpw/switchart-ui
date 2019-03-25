<template>
    <form>
        <h2 class="title">Upload</h2>

        <div class="field">
            <label class="label">Game</label>
            <div class="control">
                <div class="select">
                    <select v-model="selectedGame">
                        <option v-for="game in games" v-bind:key="game.name">{{game.name}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field file has-name">
            <label class="file-label">
                <input
                    class="file-input"
                    ref="file"
                    type="file"
                    name="artwork"
                    @change="handleFileChange"
                >
                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">Choose a file…</span>
                </span>
                <span v-text="selectedFile" class="file-name"></span>
            </label>
        </div>

        <div class="field">
            <p class="control">
                <button @click.prevent="uploadArtwork" class="button is-warning">Upload</button>
            </p>
        </div>
    </form>
</template>
<script>
// @ is an alias to /src
import EventBus from "@/event-bus.js";
import { formatName } from "@/Utils/url-utils.js";
import ArtworkApi from "@/api/artworks.js";
import GameApi from "@/api/games.js";

export default {
    name: "UploadArtwork",
    components: {},
    data() {
        return {
            games: [],
            selectedGame: "",
            selectedFile: null,
            fileData: null,
        };
    },
    mounted() {
        // console.log(this.$route);
        GameApi.getGames()
            .then(response => this.games = response);
    },
    methods: {
        uploadArtwork() {
            if (!this.selectedGame || !this.selectedFile) {
                EventBus.$emit("flash-message", {
                    selfDestruct: true,
                    message: "Please select a game and file."
                });
                return;
            }

            ArtworkApi.uploadArtwork(
                localStorage.getItem("jwt"),
                this.selectedGame,
                this.fileData[0]
            )
                .then(response => {
                    console.log(response);
                    let formattedName = formatName(this.selectedGame);
                    let redirectUrl = "/game/" + formattedName;
                    window.location.href = redirectUrl;
                })
                .catch(error => {
                    let httpCode = error.response.status;
                    if (httpCode == 422) {
                        EventBus.$emit("flash-message", {
                            selfDestruct: true,
                            message: "Error uploading file."
                        });
                    }
                    else if(httpCode == 500){
                        EventBus.$emit("flash-message", {
                            selfDestruct: true,
                            message: "Please login to upload."
                        });
                    }
                    console.log(error);
                });
        },
        handleFileChange(event) {
            this.fileData = event.target.files || event.dataTransfer.files;
            this.selectedFile = this.fileData[0].name;
        }
    }
};
</script>

