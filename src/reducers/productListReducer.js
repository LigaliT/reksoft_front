import {
    GET_PRODUCTS_LIST_FAILURE,
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS
} from "../constants/productListConstants";

export const productListReducer = (state = {loading: true, products: []}, action) => {
    switch (action.type) {
        case GET_PRODUCTS_LIST_REQUEST:
            return {
                loading: true
            };
        case GET_PRODUCTS_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page
            };
        case GET_PRODUCTS_LIST_FAILURE:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};