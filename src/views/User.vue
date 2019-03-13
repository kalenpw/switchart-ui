<template>
    <div>
        <h1>viewing user: </h1>
        {{username}}
    </div>
</template>

<script>

export default {
    name: "user",
    components: {
    },
    data(){
        return{
        }
    },
    computed:{
        username(){
            if(this.$route.params.id === localStorage.username){
                return localStorage.username;
            }
        }
    },
    mounted(){
    }

};
</script>
