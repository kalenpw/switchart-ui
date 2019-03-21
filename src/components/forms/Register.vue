<template>
    <form>
        <h2 class="title">Create account</h2>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="input" placeholder="name" v-model="name">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="email" v-model="email">
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
                <input @keyup="checkPassword" class="input" type="password" placeholder="password" v-model="password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input
                    @keyup="checkPassword"
                    class="input"
                    :class="errorPassword ? 'is-danger' : ''"
                    type="password"
                    placeholder="password confirm"
                    v-model="passwordConfirm"
                >
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
                <span v-if="errorPassword" class="icon is-small is-right has-text-danger" >
                    <i class="fas fa-times-circle"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <p v-if="errorMessage.length > 0" class="help is-danger">{{errorMessage}}</p>
            <p v-if="errorPassword.length > 0" class="help is-danger">{{errorPassword}}</p>
        </div>

        <div class="field">
            <p class="control">
                <button @click.prevent="submitRegister" class="button is-warning">Register</button>
            </p>
        </div>
    </form>
</template>
<script>
import {EventBus} from "@/event-bus.js";
import UserApi from "@/api/users.js";
export default {
    name: "Register",
    components: {},
    data() {
        return {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            errorMessage: "",
            errorPassword: "",
        };
    },
    methods: {
        submitRegister() {
            UserApi.register(this.name, this.email, this.password)
                .then(response => {
                    localStorage.setItem("jwt", response);
                    this.completeLogin();
                })
                .catch(error => {
                    this.errorMessage = "Invalid username or password";
                });
        },
        checkPassword() {
            if (this.password == this.passwordConfirm) {
                this.errorPassword = "";
            } else {
                this.errorPassword = "Password does not match";
            }
        },
        completeLogin() {
            UserApi.getLoggedInUser()
                .then(response => {
                    localStorage.setItem("username", response.name);
                    localStorage.setItem("isLoggedIn", true);
                    EventBus.$emit("logged-in");
                })
                .catch(function(error) {
                    console.log(error.response.status);
                });
        }
    },
    mounted(){
        this.errorPassword = "";
    }
};
</script>
