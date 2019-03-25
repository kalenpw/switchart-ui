<template>
    <div v-if="messages.length > 0">
        <div class="message-wrapper notification is-danger">
            <button @click="dismissMessages" class="delete"></button>
            <p v-for="message in messages" v-bind:key="message">
                {{message}}
            </p>
        </div>
    </div>
</template>

<script>
import EventBus from "@/event-bus.js";
export default {
    name: "FlashMessage",
    components: {},
    data() {
        return {
            messages: [],
            timeoutFunction: null
        };
    },
    methods:{
        dismissMessages(){
            this.messages = []; 
        }
    },
    created() {
        EventBus.$on("flash-message", ({ selfDestruct, message }) => {
            if(this.timeoutFunction){
                clearTimeout(this.timeoutFunction);
            }
            this.messages.push(message);
            if(selfDestruct){
                this.timeoutFunction = setTimeout(()=>{
                    this.dismissMessages();
                }, 5000);
            }
        });
    }
};
</script>

<style>
.message-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>