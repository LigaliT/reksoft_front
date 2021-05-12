import {
    GET_PRODUCT_DETAILS_FAILURE,
    GET_PRODUCT_DETAILS_REQUEST,
    GET_PRODUCT_DETAILS_SUCCESS
} from "../constants/productDetailsConstants";


export const productDetailsReducer = (state = {loading: true},action)=>{
    switch (action.type) {
        case GET_PRODUCT_DETAILS_REQUEST:
            return{loading: true};
        case GET_PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload,};
        case GET_PRODUCT_DETAILS_FAILURE:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};