<template>
    <div class="section">
        <h1 class="title">Admin</h1>

        <h2 class="title">Add Game</h2>
        <NewGame></NewGame>
        <div>
            <h2 class="title">Edit Game</h2>
            <p v-for="game in games" v-bind:key="game.id">
                <a :href="'/admin/game/edit/' + game.id">{{game.name}}</a>
            </p>
        </div>
    </div>
</template>

<script>
//import EditGame from "@/components/forms/admin/EditGame.vue";
import EditGame from "@/views/admin/EditGame.vue";
import NewGame from "@/components/forms/admin/NewGame.vue";
import { EventBus } from "@/event-bus.js";
import GameApi from "@/api/games.js";

export default {
    name: "game",
    components: {
        EditGame,
        NewGame
    },
    data() {
        return {
            name: "",
            description: "",
            games: []
        };
    },
    computed: {},
    mounted() {
        GameApi.getGames()
            .then(games => {
                this.games = games;
            })
            .catch(error => console.log(error))
            .finally(() => {});
    },
    methods: {
        addGame() {
            GameApi.createGame(
                localStorage.getItem("jwt"),
                this.name,
                this.description
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
        }
    }
};
</script>