import { addToCart, removeFromCart, emptyCart } from '../redux/action';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { productList } from '../redux/productAction';
import { useSelector } from "react-redux"

function Main() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productData);
  console.log("data in main component from sa", data);
  const product = {
    name: 'I phone',
    type: 'mobile',
    price: 10000,
    color: 'red'
  }
  
  useEffect(()=>{
    dispatch(productList())
  },[])

  return (
    <>
      <div className="App">
        <button onClick={() => dispatch(emptyCart(product))}>Empty to Cart</button>
      </div>

      <div className='product-container'>
        {
          data.map((item) => <div key={item.id}className='product-item'><img src={item.photo} alt="" />
            <div>Name:{item.name}</div>
            <div>Category:{item.category}</div>
            <div>Brand:{item.brand}</div>
            <div>Price:{item.price}</div>
            <div>Color:{item.color}</div>
            <div>
              <button>Add to Cart</button>
              <button>Remove to Cart</button>
            </div>
          </div>)
        }
      </div>
    </>
  );
}

export default Main;
