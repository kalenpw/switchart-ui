<template>
    <nav class="panel">
        <p class="panel-heading">Games</p>
        <div class="panel-block">
            <p class="control has-icons-left">
                <input v-model="searchText" @keyup="filterSearch" class="input" type="text" placeholder="search">
                <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </span>
            </p>
        </div>
        <p class="panel-tabs">
            <a>Alphabetical</a>
            <a>Latest</a>
            <a>Popular</a>
        </p>

        <a class="panel-block" v-for="game in gameArray" v-bind:key="game.name">
            <span class="panel-icon has-text-black">
                <i class="fab fa-nintendo-switch" aria-hidden="true"></i>
            </span>
            {{game.name}}
        </a>
        <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth">reset all filters</button>
        </div>
    </nav>
</template>

<script>
import axios from "axios";
import {alphabeticalSort} from '@/Utils/sorting-utils.js';
export default {
    name: "GameIndex",
    components: {},
    data() {
        return {
            searchText: '',
            games: null,
            gameArray: [],
            originalGames: []
        };
    },
    computed: {
    },
    mounted() {
        this.$http.get(this.$hostname + "/api/games").then(response =>{
            this.games = response.data;
            for (let i in this.games) {
                this.gameArray.push(this.games[i]);
            }
            this.gameArray.sort(alphabeticalSort);
            this.originalGames = this.gameArray;
        });
    },
    methods:{
        filterSearch(){
            this.gameArray = this.originalGames;
            this.gameArray = this.gameArray.filter(game => game.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    }
};

</script>