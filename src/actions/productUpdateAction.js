import {
    PRODUCT_UPDATE_FAILURE,
    PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS
} from "../constants/productUpdateConstants";
import {productAPI} from "../api/productAPI";

const productUpdateRequest = () => ({type: PRODUCT_UPDATE_REQUEST});
const productUpdateSuccess = (data) => ({type: PRODUCT_UPDATE_SUCCESS, payload: data});
const productUpdateFailure = (message) => ({type: PRODUCT_UPDATE_FAILURE, payload: message});
export const productUpdateReset = () => ({type: PRODUCT_UPDATE_RESET});

export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch(productUpdateRequest());
    const {
        userSignIn: {userInfo},
    } = getState();
    try {
        const {data} = await productAPI.updateProduct(userInfo, product);
        dispatch(productUpdateSuccess(data))
    } catch (e) {
        const message = e.message && e.response.data.message
            ? e.response.data.message : e.message;
        dispatch(productUpdateFailure(message));
    }
};