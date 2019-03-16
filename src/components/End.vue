<template>
    <div>
        <FlashMessage></FlashMessage>
        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container"></div>
            </div>
        </section>
    </div>
</template>

<script>
import FlashMessage from "@/components/FlashMessage.vue";

export default {
    name: "End",
    components: {
        FlashMessage
    },
    data() {
        return {};
    },
    methods: {},
    created() {}
};
</script>

<style>
</style>