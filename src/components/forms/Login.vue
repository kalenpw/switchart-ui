<template>
    <form>
        <h2 class="title">Login</h2>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="input" placeholder="Username" name="username">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" name="password">
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
import axios from "axios";
export default {
    name: "Login",
    components: {},
    data() {
        return {
            api_url: "http://localhost:8000"
        };
    },
    methods: {
        submitLogin() {
            axios
                .post(this.api_url + "/api/users/login", {
                    username: "k",
                    password: "k"
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>
