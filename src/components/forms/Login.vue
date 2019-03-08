<template>
    <form>
        <h2 class="title">Login</h2>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="input" placeholder="Username">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password">
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

export default {
    name: "Register",
    components: {},
    methods: {
        submitLogin() {
            alert("Logging in");
        }
    }
};
</script>
