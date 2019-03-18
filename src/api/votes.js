import http from '@/api/axios.js';

export default{
    upvote(token, artworkId){
        return http
            .post("/vote/upvote",{
                token: token,
                artworkId: artworkId
            })
            .then(response => {
                return response.data;
            })
    },
    downvote(token, artworkId){
        return http
            .post("/vote/downvote",{
                token: token,
                artworkId: artworkId
            })
            .then(response => {
                return response.data;
            })
    },
    getVotesForArtwork(artworkId){
            return http
                .get("/vote/artwork/" + artworkId)
                .then(response => {
                    return response.data;
                })
    }

}