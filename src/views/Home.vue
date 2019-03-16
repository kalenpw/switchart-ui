<template>
    <div class="home">
        <GameList></GameList>
        <button @click="test">A</button>
    </div>
</template>

<script>
// @ is an alias to /src
import GameList from "@/components/GameList.vue";
export default {
    name: "home",
    components: {
        GameList
    },
    methods:{
        test(){
            this.$http
                .post(this.$hostname + "/api/users/show", {
                    token: localStorage.getItem('jwt')
                })
                .then(response => {
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });

        }
    },
};
</script>
