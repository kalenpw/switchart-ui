import http from '@/api/axios.js';

export default{
    getArtworkById(id){
        return http.get("/artwork/id/" + id)
        .then(response => {
            return response.data;
        })
    }
}