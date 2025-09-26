import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// create the context, but don’t export directly here
const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  async function fetchListOfProducts() {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      if (data && data.products) {
        setListOfProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart(productDetails){
  
    
    let cpyExistingcartItems = [...cartItems];
    const findIndexOfCurrentItem = cpyExistingcartItems.findIndex(cartItem=>cartItem.id === productDetails.id)

    if(findIndexOfCurrentItem === -1){
        cpyExistingcartItems.push({
            ...productDetails,
            quantity : 1,
            totalPrice : productDetails?.price
        })
    } else {

        cpyExistingcartItems[findIndexOfCurrentItem] = {
            ...cpyExistingcartItems[findIndexOfCurrentItem],
            quantity : cpyExistingcartItems[findIndexOfCurrentItem].quantity + 1,
            totalPrice : (cpyExistingcartItems[findIndexOfCurrentItem].quantity + 1)*(cpyExistingcartItems[findIndexOfCurrentItem].price)
        }

    
    }

    setCartItems(cpyExistingcartItems);
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingcartItems));
    navigate('/cart-list');
}

function handleRemoveFromCart(productDetails, isFullyRemove){
    let cpyExistingcartItems = [...cartItems];
    const findIndexOfCurrentItem = cpyExistingcartItems.findIndex(cartItem => cartItem.id === productDetails.id);

    if(isFullyRemove){
        cpyExistingcartItems.splice(findIndexOfCurrentItem, 1);
    } else {
        cpyExistingcartItems[findIndexOfCurrentItem] = {
            ...cpyExistingcartItems[findIndexOfCurrentItem],
            quantity : cpyExistingcartItems[findIndexOfCurrentItem].quantity - 1,
            totalPrice : (cpyExistingcartItems[findIndexOfCurrentItem].quantity - 1)*(cpyExistingcartItems[findIndexOfCurrentItem].price)
        
        }
    }

    localStorage.setItem("cartItems", JSON.stringify(cpyExistingcartItems));
    setCartItems(cpyExistingcartItems);
}

useEffect(() => {
    fetchListOfProducts();
    
    const storedItem = localStorage.getItem("cartItems");

    if(storedItem){
        try{
            setCartItems(JSON.parse(storedItem));
        }catch(e){
            throw new Error(e)   
        }
    }else{
        setCartItems([]);
    }
  }, []);

  return (
    <ShoppingCartContext.Provider value={{ listOfProducts, loading, setLoading, productDetails, setProductDetails, handleAddToCart, cartItems, handleRemoveFromCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

// ✅ Export both together in a single object to make Fast Refresh happy
export { ShoppingCartProvider, ShoppingCartContext };
