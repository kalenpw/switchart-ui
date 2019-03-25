import http from '@/api/axios.js';

export default {
    /**
     * Attempts to login with given email & password  
     * @param {string} email 
     * @param {string} password 
     */
    submitLogin(email, password) {
        return http
            .post("/login", {
                email: email,
                password: password
            })
            .then(response => {
                return response.data;
            })
    },
    /**
     * Returns all User info for a user with jwt set
     */
    getLoggedInUser() {
        return http
            .post("/users/show", {
                token: localStorage.getItem("jwt")
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {

            })
    },
    register(name, email, password) {
        return http
            .post("/register", {
                name: name,
                email: email,
                password: password
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("1");
                console.log(error);
            })
    },
    logOut(){
        return http
            .post("/logout", {
                token: localStorage.getItem('jwt')
            })
            .then(response => {
                return response.data;
            })
    }
}