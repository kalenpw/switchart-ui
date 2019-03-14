<template>
    <form>
        <h2 class="title">Upload</h2>

        <div class="field">
            <label class="label">Game</label>
            <div class="control">
                <div class="select">
                    <select v-model="selectedGame">
                        <option v-for="game in games" v-bind:key="game.name">{{game.name}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="file has-name">
            <label class="file-label">
                <input
                    class="file-input"
                    ref="file"
                    type="file"
                    name="artwork"
                    @change="handleFileChange"
                >
                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">Choose a file…</span>
                </span>
                <span v-text="selectedFile" class="file-name"></span>
            </label>
        </div>

        <div class="field">
            <p class="control">
                <button @click.prevent="uploadArtwork" class="button is-success">Upload</button>
            </p>
        </div>
    </form>
</template>
<script>
// @ is an alias to /src

export default {
    name: "UploadArtwork",
    components: {},
    data() {
        return {
            games: [],
            selectedGame: "",
            selectedFile: "",
            fileData: null
        };
    },
    mounted() {
        this.$http
            .get(this.$hostname + "/api/games")
            .then(response => (this.games = response.data));
    },
    methods: {
        uploadArtwork() {
            let formData = new FormData();
            console.log(localStorage.getItem('jwt'));
            formData.append('artwork', this.fileData[0]);
            formData.append('token', localStorage.getItem('jwt'));
            formData.append('name', this.selectedGame);

            this.$http
                .post(this.$hostname + "/api/artwork/store", formData)
                .then(response => console.log(response.data))
                .catch(error => console.log(error));
        },
        handleFileChange(event) {
            this.fileData = event.target.files || event.dataTransfer.files;
            this.selectedFile = this.fileData[0].name;
        }
    }
};
</script>

