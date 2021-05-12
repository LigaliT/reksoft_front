import {
    PRODUCT_DELETE_FAILURE,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET,
    PRODUCT_DELETE_SUCCESS
} from "../constants/productDeleteConstants";


export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true
            };
        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false, success: true
            };
        case PRODUCT_DELETE_FAILURE:
            return {
                loading: false,error: action.payload
            };
        case PRODUCT_DELETE_RESET:
            return {};
        default:
            return state;
    }
};