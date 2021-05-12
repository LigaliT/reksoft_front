import React, {useEffect} from "react";
import {LoadingBox} from "../common/LoadingBox";
import {MessageBox} from "../common/MessageBox";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {signUp} from "../../actions/userSignUpAction";

const SignUpScreen = (props) => {

    const dispatch = useDispatch();
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const userSignUp = useSelector(state => state.userSignUp);
    const {userInfo, loading, error} = userSignUp;
    const watchConfirmPassword = watch("password",false);

    const onSubmit = (data) => {
        const {email,name,surname,password} = data;
        dispatch(signUp(email,name,surname,password));
    };

    useEffect(()=>{

    },[userInfo]);

    if(userInfo){
        return <Redirect to="/"></Redirect>
    }
    return (<div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1>Sign Up</h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            <div>
                <label htmlFor="email">Email address</label>
                <input id="email" {...register("email", {required: true})} placeholder="Enter Email"/>
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" {...register("name", {required: true})} placeholder="Enter Name"/>
            </div>
            <div>
                <label htmlFor="surname">Surname</label>
                <input id="surname" {...register("surname", {required: true})} placeholder="Enter Surname"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password", {required: true})}
                       placeholder="Enter Password"/>
            </div>
            <div>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="password" id="confirm_password" {...register("confirm_password",{
                    required: true,
                    validate: value => value === watchConfirmPassword
                })} placeholder="Enter Password"/>
            </div>
            <div>
                {(errors.email || errors.name || errors.surname || errors.password) &&
                <MessageBox variant="danger">This is required</MessageBox>}
                {errors.confirm_password && <MessageBox variant="danger">Passwords should match</MessageBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
            <div>
                Already have an account? <Link to="/signin">Sign In</Link>
            </div>
        </form>
    </div>)
};

export default SignUpScreen;