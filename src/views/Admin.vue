<template>
    <div class="section">
        <h1>Admin</h1>

        <h2>Add Game</h2>
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
            <div class="control">
                <button @click.prevent="addGame" class="button is-primary">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import { EventBus } from "@/event-bus.js";

export default {
    name: "game",
    components: {},
    data() {
        return {
            name: "",
            description: ""
        };
    },
    computed: {},
    mounted() {},
    methods: {
        addGame() {
            this.$http
                .post(this.$hostname + "/api/games/store", {
                    token: localStorage.getItem("jwt"),
                    name: this.name,
                    description: this.description
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    let httpCode = error.response.status;
                    if (httpCode == 403) {
                        EventBus.$emit("flash-message", {
                            selfDestruct: false,
                            message: "Must be admin to add new games."
                        });
                    }
                    else if(httpCode = 500){
                        EventBus.$emit("flash-message", {
                            selfDestruct: false,
                            message: "Login to an admin account to upload games."
                        });
                    }
                    console.log(error);
                });
        }
    }
};
</script>