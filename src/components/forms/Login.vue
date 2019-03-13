<template>
    <form>
        <h2 class="title">Login</h2>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="input" placeholder="Username" name="username" v-model="username">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" name="password" v-model="password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <p class="control">
                <button @click.prevent="submitLogin" class="button is-success">Login</button>
            </p>
        </div>
    </form>
</template>
<script>
// @ is an alias to /src
import {EventBus} from '@/event-bus.js';
import axios from "axios";
export default {
    name: "Login",
    components: {},
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        submitLogin() {
            axios
                .post(this.$hostname + "/api/users/login", {
                    username: this.username,
                    password: this.password
                })
                .then(response => {
                    localStorage.setItem('username', response.data.username);
                    EventBus.$emit('logged-in');
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>
