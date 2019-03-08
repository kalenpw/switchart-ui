<template>
    <div class="home">
        <GameList></GameList>
    </div>
</template>

<script>
// @ is an alias to /src
import GameList from "@/components/GameList.vue";

export default {
    name: "home",
    components: {
        GameList
    }
};
</script>
