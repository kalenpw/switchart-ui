import http from '@/api/axios.js';

export default{
    getGames(){
        return http.get('/games')
            .then(response => {
                return response.data;
            })
    },
}