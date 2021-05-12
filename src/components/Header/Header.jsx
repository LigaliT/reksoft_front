import React from "react";
import {Link} from "react-router-dom";
import "./Header.css"
import {useDispatch, useSelector} from "react-redux";
import {userSingOut} from "../../actions/userSignOutAction";

const Header = (props) => {
    const dispatch = useDispatch();
    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo} = userSignIn;

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const signOutHandler = () => {
        dispatch(userSingOut());
    };
    return (<div className="header">
        <div>
            <Link className="reksoft-shop" to="/">Reksoft Shop</Link>
        </div>
        <div>
            <Link to="/cart">
                Cart
                {cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)}
            </Link>
            {userInfo ? (<div className="dropdown">
                    <Link to="#">
                        {userInfo.name} {userInfo.surname}
                    </Link>
                    <ul className="dropdown-content">
                        <li><Link to="/profile">My profile</Link></li>
                        <li><Link to="/orderhistory">Order history</Link></li>
                        <li><Link to="/signout" onClick={signOutHandler}>Sign Out</Link></li>
                    </ul>
                </div>) :
                (
                    <Link to="/signin">
                        Sign In
                    </Link>
                )
            }
            {userInfo && userInfo.isSeller && (
                <div className="dropdown">
                    <Link to="#admin">
                        Seller
                    </Link>
                    <ul className="dropdown-content">
                        <li>
                            <Link to="/productlist/seller">Products</Link>
                        </li>
                    </ul>
                </div>)
            }
        </div>
    </div>)
};

export default Header;