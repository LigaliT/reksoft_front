import {USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS} from "../constants/userSignUpConstants";
import {USER_SIGN_OUT} from "../constants/userSignOutConstants";

export const userSignUpReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_REGISTER_FAILURE:
            return {loading: false, error: action.payload};
        case USER_SIGN_OUT:
            return {};
        default:
            return state;
    }
};