<template>
    <div class="home">
        <h1>Admin</h1>

        <h2>Add Game</h2>
        <form>
            <div class="field">
                <div class="control">
                    <input class="input" type="text" placeholder="Name" v-model="name">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <input class="input" type="text" placeholder="description" v-model="description">
                </div>
            </div>
            <div class="control">
                <button @click.prevent="addGame" class="button is-primary">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "game",
    components: {},
    data() {
        return {
            name: '',
            description: ''
        }
    },
    computed: {},
    mounted() {
    },
    methods: {
        addGame(){
            this.$http
                .post(this.$hostname + "/api/games/store",{
                    token: localStorage.getItem('jwt'),
                    name: this.name,
                    description: this.description 
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        }
    }
};
</script>