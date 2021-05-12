import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {MessageBox} from "../common/MessageBox";
import {LoadingBox} from "../common/LoadingBox";
import {Link, Redirect} from "react-router-dom";
import {signIn} from "../../actions/userSignInAction";

const SignInScreen = (props) => {
    const dispatch = useDispatch();
    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo, loading, error} = userSignIn;

    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => {
        const {email,password} = data;
        dispatch(signIn(email,password));
    };

    useEffect(() => {

    },[userInfo]);

    if(userInfo){
        return <Redirect to="/"/>;
    }


    return (<div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1>Sign In</h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            <div>
                <label htmlFor="email">Email address</label>
                <input id="email" {...register("email", {required: true})} placeholder="Enter Email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password", {required: true})} placeholder="Enter Password"/>
            </div>
            <div>
                {(errors.email || errors.password) && <MessageBox variant="danger">This is required</MessageBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
            <div>
                <button type="submit">Sign In</button>
            </div>
            <div>
                New customer? <Link to="/signup">Create your account</Link>
            </div>
        </form>
    </div>)
};

export default SignInScreen;