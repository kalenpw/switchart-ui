<template>
    <div>
        <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link @click.native="closeNav()" class="navbar-item" to="/">
                    <img src="../assets/logo.png">
                </router-link>

                <a
                    role="button"
                    class="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    v-bind:class="[isMobileExpanded ? 'is-active' : '']"
                    @click="toggleNav()"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu" v-bind:class="[isMobileExpanded ? 'is-active' : '']">
                <div class="navbar-start">
                    <router-link @click.native="closeNav()" class="navbar-item" to="/games">Games</router-link>
                    <router-link
                        v-if="isLoggedIn"
                        @click.native="closeNav()"
                        :to="'/user/' + username"
                        class="navbar-item"
                    >{{username}}</router-link>

                    <router-link @click.native="closeNav" class="navbar-item" to="/upload">Upload</router-link>
                </div>

                <div class="navbar-end">
                    <AccountActions></AccountActions>
                </div>
            </div>
        </nav>

    </div>
</template>

<script>
import AccountActions from "@/components/navbar/AccountActions.vue";

import UserApi from "@/api/users.js";
import EventBus from "@/event-bus.js";

export default {
    components: {
        AccountActions
    },
    name: "Navbar",
    props: {
        msg: String
    },
    data() {
        return {
            isMobileExpanded: false,
            username: '',
            isLoggedIn: false
        };
    },
    computed: {
    },
    methods: {
        toggleNav() {
            this.isMobileExpanded = !this.isMobileExpanded;
        },
        closeNav() {
            this.isMobileExpanded = false;
        },
    },
    created(){
        EventBus.$on('logged-in', () =>{
            this.username = localStorage.getItem('username');
            this.isLoggedIn = true;
            this.closeNav();
        });
        EventBus.$on('logged-out', () =>{
            this.username = "";
            this.isLoggedIn = false;
            this.closeNav();
        });
    },
    mounted(){
        UserApi.getLoggedInUser()
            .then(response =>{
                this.isLoggedIn = true;
                this.username = response.name;
                localStorage.setItem("username", response.name);
            })
            .catch(error => {
                this.isLoggedIn = false;
                localStorage.removeItem("username");
                localStorage.removeItem("jwt");
            })
    }
};
</script>

<style scoped>
</style>
