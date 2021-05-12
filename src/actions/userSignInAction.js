import {usersAPI} from "../api/usersAPI";
import {USER_SIGN_IN_FAILURE, USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS} from "../constants/userSignInConstants";

const userSignInRequest = (email, password) => ({type: USER_SIGN_IN_REQUEST, payload: {email, password}});
export const userSignInSuccess = (data) => ({type: USER_SIGN_IN_SUCCESS, payload: data});
const userSignInFailure = (error) => ({
    type: USER_SIGN_IN_FAILURE, payload: error.response && error.response.data.message
        ? error.response.data.message : error.message
});

export const signIn = (email,password) => async (dispatch) => {
    dispatch(userSignInRequest(email,password));
    try {
        const {data} = await usersAPI.signIn(email,password);
        console.log(data);
        dispatch(userSignInSuccess(data));
        localStorage.setItem("userInfo",JSON.stringify(data));
    } catch (e) {
        dispatch(userSignInFailure(e));
    }
};