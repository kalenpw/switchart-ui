<template>
  <div class="about">
    <GameIndex></GameIndex>
  </div>
</template>
<script>
// @ is an alias to /src
import GameIndex from "@/components/GameIndex.vue";

export default {
    name: "home",
    components: {
        GameIndex
    }
};
</script>
