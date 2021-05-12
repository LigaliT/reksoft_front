import {ADD_TO_CART, CART_EMPTY, REMOVE_FROM_CART} from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                return {
                    ...state,
                    error: "",
                    cartItems: state.cartItems.map((c) => c.product === existItem.product ? item : c),
                };
            } else {
                return {
                    ...state,
                    error: "",
                    cartItems: [...state.cartItems, item]
                };
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                error: "",
                cartItems: state.cartItems.filter(c => c.product !== action.payload)
            };
        case CART_EMPTY:
            return { ...state, error: '', cartItems: [] };
        default:
            return state;
    }
};