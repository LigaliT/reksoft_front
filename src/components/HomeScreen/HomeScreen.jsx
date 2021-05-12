import React, {useEffect} from "react";
import "./HomeScreen.css"
import {LoadingBox} from "../common/LoadingBox";
import {MessageBox} from "../common/MessageBox";
import {Product} from "../common/Product";
import {useSelector,useDispatch} from "react-redux";
import {getProductsList} from "../../actions/productListAction";


const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const {loading,error,products} = productList;
    useEffect(() => {
            dispatch(getProductsList({}))
        }
        ,[dispatch]);
    return(
        <div>
            <h2>Featured Products</h2>
            {loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (<div>
                {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                <div className="home-screen">
                    {products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                    ))}
                </div>
            </div>)}
        </div>
    )
};

export default HomeScreen;