<template>
    <form>
        <h2 class="title">Create account</h2>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="input" placeholder="Username">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email">
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
                <input class="input" type="password" placeholder="Password">
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
    methods: {
        submitRegister() {
            alert("registering acc");
        }
    }
};
</script>
