import {USER_SIGN_IN_FAILURE, USER_SIGN_IN_REQUEST, USER_SIGN_IN_SUCCESS} from "../constants/userSignInConstants";

export const userSignInReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGN_IN_REQUEST:
            return {loading: true};
        case USER_SIGN_IN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGN_IN_FAILURE:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};