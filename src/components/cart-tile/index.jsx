import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../context";

function CartTile ({singleCartItem}){

    const {handleRemoveFromCart, handleAddToCart} = useContext(ShoppingCartContext);
    

    return (
    <Fragment>
    <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2 flex items-start gap-4">
            <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-3xl">
                <img src={singleCartItem?.thumbnail} className="w-full h-full object-contain" alt="" />
            </div>
            <div>
                <h3 className="text-base font-bold text-gray-900">{singleCartItem?.title}</h3>
                <button onClick={()=>{handleRemoveFromCart(singleCartItem, true)}} className="text-sm px-4 py-3 bg-black text-black font-extrabold">Remove</button>
            </div>
        </div>
        <div className="ml-auto">
            <h3 className="text-lg font-bold text-gray-900">{singleCartItem?.totalPrice}</h3>
            <p className="mt-2 mb-3 font-bold text-[16px]">Quantity:{singleCartItem?.quantity}</p>
            <div className="mt-3">
                <button onClick={()=>{handleRemoveFromCart(singleCartItem, false)}} className="border border-[#430505] disabled:opacity-55" disabled={singleCartItem?.quantity===1}>-</button>
                <button onClick={()=>{handleAddToCart(singleCartItem)}} className="border border-[#370707]">+</button>
            </div>
        </div>
    </div>
    <hr className="border-gray-600"/>
    </Fragment>
    
  )
}

export default CartTile;