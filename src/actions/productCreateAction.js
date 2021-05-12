import {
    PRODUCT_CREATE_FAILURE,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_SUCCESS
} from "../constants/productCreateConstants";
import {productAPI} from "../api/productAPI";

const productCreateRequest = () => ({type: PRODUCT_CREATE_REQUEST});
const productCreateSuccess = (data) => ({type: PRODUCT_CREATE_SUCCESS,payload: data.product});
const productCreateFailure = (message) => ({type: PRODUCT_CREATE_FAILURE,payload: message});
export const productCreateReset = () => ({type: PRODUCT_CREATE_RESET});

export const createProduct = () => async (dispatch, getState) => {
    dispatch(productCreateRequest());
    const {userSignIn: {userInfo},} = getState();
    try {
        const {data} = await productAPI.createProduct(userInfo);
        dispatch(productCreateSuccess(data));
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch(productCreateFailure(message));
    }
};