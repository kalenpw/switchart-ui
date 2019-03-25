<template>
    <form>
        <div class="field">
            <div class="control">
                <input class="input" type="text" placeholder="Name" v-model="name">
            </div>
        </div>

        <div class="field">
            <div class="control">
                <input class="input" type="text" placeholder="description" v-model="description">
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
                <button @click.prevent="addGame" class="button is-primary">Submit</button>
            </div>
        </div>
    </form>
</template>

<script>
import EventBus from "@/event-bus.js";
import GameApi from "@/api/games.js";

export default {
    name: "game",
    components: {
    },
    data() {
        return {
            name: "",
            description: "",
            fileName: "",
            fileData: null
        };
    },
    computed: {},
    mounted() {
    },
    methods: {
        addGame() {
            if (!this.fileName || !this.fileData) {
                EventBus.$emit("flash-message", {
                    selfDestruct: true,
                    message: "Please select a game and file."
                });
                return;
            }

            GameApi.createGame(
                localStorage.getItem("jwt"),
                this.name,
                this.description,
                this.fileData[0]
            )
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    let httpCode = error.response.status;
                    if (httpCode == 403) {
                        EventBus.$emit("flash-message", {
                            selfDestruct: false,
                            message: "Must be admin to add new games."
                        });
                    } else if ((httpCode = 500)) {
                        EventBus.$emit("flash-message", {
                            selfDestruct: false,
                            message:
                                "Login to an admin account to upload games."
                        });
                    }
                    console.log(error);
                });
        },
        handleFileChange(){
            this.fileData = event.target.files || event.dataTransfer.files;
            this.fileName = this.fileData[0].name;
        }
    }
};
</script>

