<template>
  <div class="home">
    <GameList></GameList>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import GameList from '@/components/GameList.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    GameList
  }
}
</script>
