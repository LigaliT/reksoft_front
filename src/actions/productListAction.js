import {productAPI} from "../api/productAPI";
import {
    GET_PRODUCTS_LIST_FAILURE,
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS
} from "../constants/productListConstants";

const getProductListRequest = () => ({type:GET_PRODUCTS_LIST_REQUEST});
const getProductListSuccess = (data)=> ({type:GET_PRODUCTS_LIST_SUCCESS, payload:data});
const getProductListFailure = (error) => ({type: GET_PRODUCTS_LIST_FAILURE, payload: error});

export const getProductsList = ({
                            pageNumber = '',
                            seller = '',
                            name = '',
                            order = '',
                            min = 0,
                            max = 0,
                        }) => async(dispatch) => {
    dispatch(getProductListRequest);
    try {
        const {data} = await productAPI.getProducts(pageNumber,seller,name,order,min,max);
        dispatch(getProductListSuccess(data));
    }
    catch (e) {
        dispatch(getProductListFailure(e.message));
    }
};
