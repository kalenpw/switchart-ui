<template>
    <div>
        <router-link :to="'/game/' + imageUrl">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">{{name}}</p>
                </header>
                <div class="card-image">
                    <figure class="image is-2by1">
                        <img v-bind:src="image" v-bind:alt="name">
                        <!-- <img src="@/assets/img.png"> -->
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">{{description}}</div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "Game",
    props: {
        name: String,
        description: String,
    },

    data() {
        return {};
    },
    computed: {
        imageUrl() {
            // console.log(this.name);
            // return this.name;
            return this.name.replace(/ /g, '_').replace(/\W/g, '');
        },
        image(){
            let formattedName = this.name.replace(/ /g, '_').replace(/\W/g, '');
            return "http://switchart.tk/images/Backgrounds/" + formattedName + ".jpg";

        }
    },

    mounted() {},

    methods: {}
};
</script>

<style>
</style>
