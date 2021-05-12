import {usersAPI} from "../api/usersAPI";
import {USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS} from "../constants/userSignUpConstants";
import {userSignInSuccess} from "./userSignInAction";

const userRegisterRequest = (email,password) => ({type:USER_REGISTER_REQUEST,payload:{email,password}});
const userRegisterSuccess = (data) => ({type:USER_REGISTER_SUCCESS,payload:data});
const userRegisterFailure = (error) => ({type: USER_REGISTER_FAILURE,payload:
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message,});

export const signUp = (email,name,surname,password) => async (dispatch) => {
    dispatch(userRegisterRequest(email,password));
    try {
        const {data} = await usersAPI.signUp(email,name,surname,password);
        console.log(data);
        dispatch(userRegisterSuccess(data));
        dispatch(userSignInSuccess(data));
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch (e) {
        dispatch(userRegisterFailure(e));
    }
};