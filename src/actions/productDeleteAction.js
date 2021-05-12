import {productAPI} from "../api/productAPI";
import {
    PRODUCT_DELETE_FAILURE,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET,
    PRODUCT_DELETE_SUCCESS
} from "../constants/productDeleteConstants";

const productDeleteRequest = () => ({type: PRODUCT_DELETE_REQUEST});
const productDeleteSuccess = () => ({type: PRODUCT_DELETE_SUCCESS});
const productDeleteFailure = (message) => ({type: PRODUCT_DELETE_FAILURE, payload: message});
export const productDeleteReset = () => ({ type: PRODUCT_DELETE_RESET });

export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch(productDeleteRequest());
    const {
        userSignIn: {userInfo},
    } = getState();
    try {
        const {data} = await productAPI.deleteProduct(userInfo, productId);
        dispatch(productDeleteSuccess());
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch(productDeleteFailure(message));
    }
};