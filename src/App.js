import './App.css';
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import ProductScreen from "./components/ProductScreen/ProductScreen";
import Header from "./components/Header/Header";
import SignUpScreen from "./components/SignUpScreen/SignUpScreen";
import SignInScreen from "./components/SignInScreen/SignInScreen";
import CartScreen from "./components/CartScreen/CartScreen";
import SellerRoute from "./components/common/SellerRoute";
import ProductListScreen from "./components/ProductListScreen/ProductListScreen";
import ProductEditScreen from "./components/ProductEditScreen/ProductEditScreen";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <div>
                    <Header/>
                    <Route path="/cart" component={CartScreen} exact/>
                    <Route path="/signin" component={SignInScreen} exact/>
                    <Route path="/signup" component={SignUpScreen} exact/>
                    <Route path="/product/:id" component={ProductScreen} exact/>
                    <SellerRoute path="/productlist/pageNumber/:pageNumber"
                                 component={ProductListScreen}
                                 exact/>
                    <SellerRoute path="/product/:id/edit" component={ProductEditScreen}/>
                    <SellerRoute path="/productlist/seller" component={ProductListScreen}/>
                    <Route path="/" component={HomeScreen} exact/>
                </div>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
