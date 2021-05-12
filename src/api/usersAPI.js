import instance from "./instance";

export const usersAPI = {
    signUp(email,name,surname,password){
        return instance
            .post('/users/signup',{email,name,surname,password});
    },
    signIn(email,password){
        return instance
            .post('/users/signin',{email,password});
    }
};