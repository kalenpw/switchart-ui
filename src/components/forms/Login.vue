<template>
    <form>
        <h2 class="title">Login</h2>

        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email" v-model="email">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
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

export default {
    name: "Login",
    components: {},
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        submitLogin() {
            this.$http
                .post(this.$hostname + "/api/login", {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    localStorage.setItem('jwt', response.data.access_token);
                })
                .catch(function(error) {
                    console.log(error);
                });

            //Set localStorage info now that we're validated
            this.$http
                .post(this.$hostname + "/api/users/show", {
                    token: localStorage.getItem('jwt')
                })
                .then(response => {
                    localStorage.setItem('username', response.data.name);
                    localStorage.setItem('isLoggedIn', true);
                    EventBus.$emit('logged-in');
                })
                .catch(function(error) {
                    console.log(error);
                });

        }
    }
};
</script>
