import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {productListReducer} from "./reducers/productListReducer";
import {productDetailsReducer} from "./reducers/productDetailsReducer";
import {userSignInReducer} from "./reducers/userSignInReducer";
import {userSignUpReducer} from "./reducers/userSignUpReducer";
import {cartReducer} from "./reducers/cartReducer";
import {productCreateReducer} from "./reducers/productCreateReducer";
import {productDeleteReducer} from "./reducers/productDeleteReducer";
import {productUpdateReducer} from "./reducers/productUpdateReducer";

const initialState = {
    userSignIn: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
    }
};

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userSignIn: userSignInReducer,
    userSignUp: userSignUpReducer,
    cart: cartReducer,
    productCreate: productCreateReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;