<template>
    <div>
        <nav class="navbar is-black" role="navigation" aria-label="main navigation">
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
                    v-bind:class="[active ? activeClass : '']"
                    @click="toggleNav()"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu" v-bind:class="[active ? activeClass : '']">
                <div class="navbar-start">
                    <router-link @click.native="closeNav()" class="navbar-item" to="/games">Games</router-link>
                    <router-link
                        v-if="isLoggedIn"
                        @click.native="closeNav()"
                        :to="'/user/' + username"
                        class="navbar-item"
                    >{{username}}</router-link>
                    <!-- <a class="navbar-item">Documentation</a> -->
                    <!-- <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">More</a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item">About</a>
                        <a class="navbar-item">Jobs</a>
                        <a class="navbar-item">Contact</a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">Report an issue</a>
                    </div>
                    </div>-->
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a @click="registerModal()" class="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a @click="loginModal()" class="button is-light">Log in</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div v-if="showForm" class="modal is-active">
            <div @click="showForm = false" class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <div v-if="showRegister">
                        <Register></Register>
                    </div>
                    <div v-if="showLogin">
                        <Login></Login>
                    </div>
                </div>
                <!-- Any other Bulma elements you want -->
            </div>
            <button @click="showForm = false" class="modal-close is-large" aria-label="close"></button>
        </div>
    </div>
</template>

<script>
import Register from "@/components/forms/Register.vue";
import Login from "@/components/forms/Login.vue";
import {EventBus} from "@/event-bus.js";
// EventBus.$on('logged-in', ()=>{
//     console.log("log in herd");
// });
export default {
    components: {
        Register,
        Login
    },
    name: "Navbar",
    props: {
        msg: String
    },
    data() {
        return {
            active: false,
            activeClass: "is-active",
            showRegister: false,
            showLogin: false,
            showForm: false,
            username: '',
            isLoggedIn: false
        };
    },
    computed: {
    },
    methods: {
        toggleNav() {
            this.active = !this.active;
        },
        closeNav() {
            this.active = false;
        },
        registerModal() {
            this.showLogin = false;
            this.showForm = true;
            this.showRegister = true;
        },
        loginModal() {
            this.showRegister = false;
            this.showForm = true;
            this.showLogin = true;
        }
    },
    created(){
        EventBus.$on('logged-in', () =>{
            console.log("log in triggered");
            this.username = localStorage.getItem('username');
            this.isLoggedIn = true;
            this.closeNav();
            this.showForm = false;
            this.showLogin = false;
            this.showRegister = false;
        });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
