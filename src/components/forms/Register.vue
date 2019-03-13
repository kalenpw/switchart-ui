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
                <input class="input" type="password" placeholder="Password" v-model="password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password confirm">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <p class="control">
                <button @click.prevent="submitRegister" class="button is-success">Register</button>
            </p>
        </div>
    </form>
</template>
<script>
// @ is an alias to /src

export default {
    name: "Register",
    components: {},
    data() {
        return {
            name: "",
            email: "",
            password: ""
        };
    },
    methods: {
        submitRegister() {
            this.$http
                .post(this.$hostname + "/api/register", {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    localStorage.setItem('jwt', response.data.access_token);
                    console.log(response.data);
                    EventBus.$emit("registered");
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>
