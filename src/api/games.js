import http from '@/api/axios.js';

export default{
    getGames(){
        return http.get('/games')
            .then(response => {
                return response.data;
            })
    },
    createGame(token, name, description, file){
        let formData = new FormData();
        formData.append("token", token);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", file);

        return http.post('/games/store', formData)
        .then(response => {
            return response.data;
        })
    },
    updateGame(token, id, name, description){
        return http.post('/games/update', {
            token: token,
            id: id,
            name: name,
            description: description
        }).then(response => {
            return response.data;
        })
    },
    getGameByName(name){
        return http.get("/games/name/" + name)
            .then(response => {
                return response.data;
            })
    },
    getGameById(id){
        return http.get("/games/id/" + id)
            .then(response => {
                console.log(response);
                return response.data;
            })
    },
}