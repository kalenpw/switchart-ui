import http from '@/api/axios.js';

export default{
    getArtworkById(id){
        return http.get("/artwork/id/" + id)
        .then(response => {
            return response.data;
        })
    },
    getArtworksByUser(name){
        return http.get("/artwork/user/" + name)
        .then(response => {
            return response.data;
        })
    },
    getArtworksByGame(gameName){
        return http.get("/artwork/game/" + gameName)
        .then(response => {
            return response.data;
        }) 
    },
    deleteArtwork(token, id){
        return http.post("/artwork/destroy", {
            id: id,
            token: token
        })
        .then(response => {
            return response.data;
        })
    }
}