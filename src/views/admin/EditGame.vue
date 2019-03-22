<template>
    <div class="section">
        <form>
            <div class="field">
                <div class="control">
                    <input class="input" type="text" placeholder="Name" v-model="name">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="description"
                        v-model="description"
                    >
                </div>
            </div>

            <div class="field file has-name">
                <label class="file-label">
                    <input
                        class="file-input"
                        ref="file"
                        type="file"
                        name="image"
                        @change="handleFileChange"
                    >
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">Choose a file…</span>
                    </span>
                    <span v-text="fileName" class="file-name"></span>
                </label>
            </div>

            <div class="field">
                <div class="control">
                    <button @click.prevent="editGame" class="button is-primary">Update</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import GameApi from "@/api/games.js";
import { EventBus } from "@/event-bus.js";

export default {
    name: "EditGame",
    props: {},
    data() {
        return {
            game: null,
            name: "",
            description: "",
            gameId: 0,
            fileName: "",
            fileData: []
        };
    },
    mounted() {
        this.gameId = this.$route.params.id;
        GameApi.getGameById(this.gameId).then(response => {
            this.game = response;
            console.log(response);
            this.name = this.game.name;
            this.description = this.game.description;
        });
    },
    methods: {
        editGame() {
            console.log(localStorage.getItem("jwt"));
            GameApi.updateGame(
                localStorage.getItem("jwt"),
                this.gameId,
                this.name,
                this.description,
                this.fileData[0]
            )
                .then(response => {
                    console.log(response);
                    EventBus.$emit("flash-message", {
                        selfDestruct: true,
                        message: "Succesfully updated " + this.name
                    });
                })
                .catch(error => {
                    let httpCode = error.response.status;
                    if (httpCode == 403) {
                        EventBus.$emit("flash-message", {
                            selfDestruct: false,
                            message: "Must be admin to update a game."
                        });
                    } else if ((httpCode = 500)) {
                        EventBus.$emit("flash-message", {
                            selfDestruct: false,
                            message:
                                "Login to an admin account to update a game."
                        });
                    }
                    console.log(error);
                });
        },
        handleFileChange() {
            this.fileData = event.target.files || event.dataTransfer.files;
            this.fileName = this.fileData[0].name;
        }
    }
};
</script>