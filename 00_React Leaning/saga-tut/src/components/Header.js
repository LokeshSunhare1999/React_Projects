import shop from "../asset/img/shop.png";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { productSearch } from '../redux/productAction'

const Header = () => {
    const result = useSelector((state) => state.cartData)
    const dispatch = useDispatch();

    console.log("redux data in header", result);
    return (
        <div className="header">
            <Link to="/"><h1 className="logo">E-Commers</h1></Link>
            <div className="search-box">
                <input type="text" placeholder="Search Product"
                    onChange={(event) => dispatch(productSearch(event.target.value))} />
            </div>
            <Link to="/cart">
                <div className="cart-div">
                    <span>{result.length}</span>
                    <img className='main-img d-flex justify-content-center' src={shop} alt="" />
                </div>
            </Link>
        </div>
    )

}

export default Header;