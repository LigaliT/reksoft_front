import React, {useEffect} from "react";
import "./ProductListScreen.css"

import {Link, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {LoadingBox} from "../common/LoadingBox";
import {MessageBox} from "../common/MessageBox";
import {deleteProduct, productDeleteReset} from "../../actions/productDeleteAction";
import {createProduct, productCreateReset} from "../../actions/productCreateAction";
import {getProductsList} from "../../actions/productListAction";

const ProductListScreen = (props) => {

    const {pageNumber = 1} = useParams();
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const productList = useSelector((state) => state.productList);
    const {loading, error, products, page, pages} = productList;

    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo} = userSignIn;
    const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    useEffect(() => {
        if (successCreate) {
            dispatch(productCreateReset());
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch(productDeleteReset());
        }
        dispatch(
            getProductsList({ seller: sellerMode ? userInfo._id : '', pageNumber })
        );
    },[
        createdProduct,
        dispatch,
        props.history,
        sellerMode,
        successCreate,
        successDelete,
        userInfo._id,
        pageNumber,
    ]);

    const deleteHandler = (product) => {
        if(window.confirm("Are you sure to delete?")){
            dispatch(deleteProduct(product._id));
        }
    };

    const createHandler = () => {
        dispatch(createProduct());
    };

    const editHandler = (product) => {
        return props.history.push(`/product/${product._id}/edit`);
    };


    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={createHandler}>
                    Create Product
                </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loading ? (
                <LoadingBox/>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => editHandler(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        classname="small"
                                        onClick={()=>deleteHandler(product)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="row center pagination">
                        {[...Array(pages).keys()].map((x)=>(
                            <Link
                                className={x + 1 === page ? 'active':''}
                                key={x + 1}
                                to={`/productlist/pageNumber/${x + 1}`}
                            >
                                {x + 1}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
};

export default ProductListScreen;