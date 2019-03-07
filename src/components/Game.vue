<template>
    <div>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">{{name}}</p>
            </header>
            <div class="card-image">
                <figure class="image is-2by1">
                    <img
                        v-bind:src="image"
                        v-bind:alt="name"
                    >
                    <!-- <img src="@/assets/img.png"> -->
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    {{description}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Game",
    props: {
        name: String,
        description: String,
        image: String
    },

    data() {
        return {
        };
    },
    computed:{
        imageUrl(){
        }
    },

    mounted(){
    },

    methods: {}
};
</script>

<style scoped>
</style>
