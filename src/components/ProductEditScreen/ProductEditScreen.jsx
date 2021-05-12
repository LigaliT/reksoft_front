import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {LoadingBox} from "../common/LoadingBox";
import {MessageBox} from "../common/MessageBox";
import {productUpdateReset, updateProduct} from "../../actions/productUpdateAction";
import {getProductDetails} from "../../actions/productDetailsAction";
import {Input} from 'antd';
import {productAPI} from "../../api/productAPI";

const ProductEditScreen = (props) => {
    const productId = props.match.params.id;
    const [image, setImage] = useState('');

    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = productUpdate;


    const dispatch = useDispatch();
    const {register, handleSubmit, control, setValue, formState: {errors}} = useForm();
    const onSubmit = data => {
        console.log(data);
        dispatch(updateProduct({
            _id: productId,
            ...data,
            image
        }));
    };

    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo} = userSignIn;
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const {data} = await productAPI.uploadImage(userInfo, bodyFormData);
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };


    useEffect(() => {
        if (successUpdate) {
            props.history.push(`/productlist/seller`);
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch(productUpdateReset);
            dispatch(getProductDetails(productId));
        }
    }, [product, dispatch, productId, successUpdate, props.history]);

    return (
        <div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox/>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? (
                    <LoadingBox/>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>
                        <div>
                            <label htmlFor="name">Name</label>
                            {/*<Controller*/}
                            {/*    name="name"*/}
                            {/*    control={control}*/}
                            {/*    setValue={setValue}*/}
                            {/*    render={({field:{onChange,value,ref} }) => (*/}
                            {/*        <Input*/}
                            {/*            onChange={onChange}*/}
                            {/*            selected={value}*/}
                            {/*        />*/}
                            {/*        )}*/}
                            {/*/>*/}
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                defaultValue={product.name}
                                {...register("name", {required: true})}
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input
                                id="price"
                                type="number"
                                placeholder="Enter price"
                                defaultValue={product.price}
                                {...register("price", {required: true, min: 1})}
                            />
                        </div>
                        <div>
                            <label htmlFor="countInStock">Count In Stock</label>
                            <input
                                id="countInStock"
                                type="number"
                                placeholder="Enter count"
                                defaultValue={product.countInStock}
                                {...register("countInStock", {required: true, min: 1})}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows="3"
                                type="text"
                                placeholder="Enter description"
                                defaultValue={product.description}
                                {...register("description", {required: true, minLength: 10, maxLength: 300})}
                            />
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input
                                id="image"
                                type="text"
                                placeholder="Enter image"
                                defaultValue={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="imageFile">Image File</label>
                            <input
                                type="file"
                                id="imageFile"
                                label="Choose Image"
                                onChange={uploadFileHandler}
                            />
                            {loadingUpload && <LoadingBox/>}
                            {errorUpload && (
                                <MessageBox variant="danger">{errorUpload}</MessageBox>
                            )}
                        </div>
                        <div>
                            {(errors.name || errors.price || errors.countInStock || errors.description) &&
                            <MessageBox variant="danger">This is required</MessageBox>}
                            {(errors.price?.type === "min" || errors.countInStock?.type === "min") &&
                            <MessageBox variant="danger">Minimum is 1</MessageBox>}
                            {(errors.description?.type === "minLength" || errors.description?.type === "maxLength") &&
                            <MessageBox variant="danger">Description should be more than 10 symbols and less than 300
                                symbols</MessageBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </div>
                        <div>
                            <button className="primary" type="submit">
                                Update
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
};

export default ProductEditScreen;