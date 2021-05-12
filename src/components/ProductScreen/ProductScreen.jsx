import React, {useEffect} from "react";
import "./ProductScreen.css"
import {useDispatch, useSelector} from "react-redux";
import {getProductDetails} from "../../actions/productDetailsAction";
import {LoadingBox} from "../common/LoadingBox";
import {MessageBox} from "../common/MessageBox";
import {addToCartAction} from "../../actions/cartAction";

const ProductScreen = (props) => {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.productDetails);
    const {loading,error,product} = productDetails;
    useEffect(()=>{
        dispatch(getProductDetails(productId));
    },[dispatch,productId]);

    const handleAddToCart = () => {
        dispatch(addToCartAction(productId));
    };

    return(
        <div>
            {loading ? (<LoadingBox/>) : error ? <MessageBox variant="danger">{error}</MessageBox> : (<div className="product-screen">
                <div>
                    <img src={product.image} alt={product.name}/>
                </div>
                <div>
                    <h1>{product.name}</h1>
                </div>
                <div>
                    <h2>${product.price}</h2>
                </div>
                <div>
                    <p>{product.description}</p>
                </div>
                <div>
                    <button onClick={handleAddToCart}>Add to cart</button>
                </div>
            </div>)}
        </div>
    )
};

export default ProductScreen;