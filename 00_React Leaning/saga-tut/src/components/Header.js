import shop from "../asset/img/shop.png";
import { useSelector } from "react-redux/es/exports";
const Header = () => {
    const result = useSelector((state) => state.cartData)
    console.log("redux data in header", result);

    return (
        <div className="header">
            <div className="cart-div">
                <span>{result.length}</span>
                <img className='main-img d-flex justify-content-center' src={shop} alt="" />
            </div>
        </div>
    )

}

export default Header;