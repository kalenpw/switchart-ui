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
            <a class="is-active">all</a>
            <a>public</a>
            <a>private</a>
            <a>sources</a>
            <a>forks</a>
        </p>

        <a class="panel-block" v-for="game in gameArray" v-bind:key="game.title">
            <span class="panel-icon has-text-black">
                <i class="fab fa-nintendo-switch" aria-hidden="true"></i>
            </span>
            {{game.title}}
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
        axios.get(this.$hostname + "/api/games").then(response => {
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
            console.log(this.searchText);
            this.gameArray = this.gameArray.filter(game => game.title.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    }
};

</script>