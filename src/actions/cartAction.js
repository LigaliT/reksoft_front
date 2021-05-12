import {cartAPI} from "../api/cartAPI";
import {ADD_TO_CART, ADD_TO_CART_FAIL,REMOVE_FROM_CART} from "../constants/cartConstants";

const addToCartFail = (cartItems) => ({
    type: ADD_TO_CART_FAIL,
    payload: `Can't Add To Cart. Buy only from ${cartItems[0].seller.seller.name} in this order`
});
const addToCart = (data,qty) => ({
    type: ADD_TO_CART, payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty,
    }
});

export const addToCartAction = (id, qty = 1) => async (dispatch, getState) => {
    const {data} = await cartAPI.addToCart(id);
    const {
        cart: {cartItems},
    } = getState();
    if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
        dispatch(addToCartFail(cartItems));
    } else {
        dispatch(addToCart(data,qty));
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }
};


const removeFromCart = (id) => ({type:REMOVE_FROM_CART, payload: id});

export const removeFromCartAction = (id) => (dispatch,getState) => {
    dispatch(removeFromCart(id));
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};