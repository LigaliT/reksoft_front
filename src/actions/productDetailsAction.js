import {productAPI} from "../api/productAPI";
import {
    GET_PRODUCT_DETAILS_FAILURE,
    GET_PRODUCT_DETAILS_REQUEST,
    GET_PRODUCT_DETAILS_SUCCESS
} from "../constants/productDetailsConstants";

const getProductDetailsRequest = (id) => ({type: GET_PRODUCT_DETAILS_REQUEST,payload: id});
const getProductDetailsSuccess = (data) => ({type: GET_PRODUCT_DETAILS_SUCCESS, payload: data});
const getProductDetailsFailure = (error) => ({type: GET_PRODUCT_DETAILS_FAILURE, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message});

export const getProductDetails = (id) => async(dispatch)=>{
    dispatch(getProductDetailsRequest());
    try {
        const {data} = await productAPI.getProduct(id);
        dispatch(getProductDetailsSuccess(data));
    }catch (e) {
        dispatch(getProductDetailsFailure(e));
    }
};