<template>
    <div>
        <h1>viewing user: </h1>
        {{$route.params.id}}
    </div>
</template>

<script>

export default {
    name: "user",
    components: {
    },
    data(){
        return{
            username: ''
        }
    },
    mounted(){
    }

};
</script>
