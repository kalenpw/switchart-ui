<template>
    <div class="navbar-item">
        <div class="buttons">
            <a @click="showRegisterModal()" class="button is-warning">
                <strong>Sign up</strong>
            </a>
            <a @click="showLoginModal()" class="button is-light">Log in</a>

            <a v-if="isLoggedIn" @click="signOut" class="button is-light">Logout</a>
        </div>

        <div v-if="isLoginVisible || isRegisterVisible" class="modal is-active">
            <div @click="hideAccountForms" class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <div v-if="isRegisterVisible">
                        <Register></Register>
                    </div>
                    <div v-if="isLoginVisible">
                        <Login></Login>
                    </div>
                </div>
            </div>
            <button @click="hideAccountForms" class="modal-close is-large" aria-label="close"></button>
        </div>
    </div>
</template>

<script>
import Register from "@/components/forms/Register.vue";
import Login from "@/components/forms/Login.vue";
import EventBus from "@/event-bus.js";
import UserApi from "@/api/users.js";

export default {
    name: "AccountActions",
    components: {
        Register,
        Login
    },
    data() {
        return {
            isLoginVisible: false,
            isRegisterVisible: false,
            isLoggedIn: false
        };
    },
    methods: {
        showRegisterModal() {
            this.isLoginVisible = false;
            this.isRegisterVisible = true;
        },
        showLoginModal() {
            this.isRegisterVisible = false;
            this.isLoginVisible = true;
        },
        hideAccountForms() {
            this.isRegisterVisible = false;
            this.isLoginVisible = false;
        },
        signOut() {
            UserApi.logOut()
                .then(response => {
                    EventBus.$emit("logged-out");
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("username");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created() {
        EventBus.$on("logged-in", () => {
            this.hideAccountForms();
            this.isLoggedIn = true;
        });
    },
    mounted() {
        UserApi.getLoggedInUser()
            .then(response => {
                this.isLoggedIn = true;
                localStorage.setItem("username", response.name);
            })
            .catch(error => {
                this.isLoggedIn = false;
                localStorage.removeItem("username");
                localStorage.removeItem("jwt");
            });
    }
};
</script>
