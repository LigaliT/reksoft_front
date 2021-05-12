import {USER_SIGN_OUT} from "../constants/userSignOutConstants";

export const userSingOut = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    dispatch({type:USER_SIGN_OUT});
    document.location.href = "/signin";
};