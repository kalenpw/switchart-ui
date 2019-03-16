<template>
    <div id="app">
        <navbar></navbar>
        <div class="section">
            <router-view/>
            <FlashMessage></FlashMessage>
        </div>
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import FlashMessage from "@/components/FlashMessage.vue";
export default {
    name: "app",
    components: {
        Navbar,
        FlashMessage
    }
};
</script>

<style>
</style>
