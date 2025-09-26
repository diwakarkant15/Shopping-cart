import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../context";

 
 function ProductTile({_productTile}){
    
    const navigate = useNavigate();
    const {handleAddToCart} = useContext(ShoppingCartContext);

    function handleNavigateToProductDetailsPage(currProdId){
        
        navigate(`/product-details/${currProdId}`)
    }

    return <div className="relative group border border-cyan-700 p-6 cursor-pointer">
        <div className="overflow-hidden aspect-w-1 aspect-h-1" key={_productTile?.id}>
            <img src={_productTile?.thumbnail} alt={_productTile?.title} className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125" />
        </div>
         <div className="flex items-start justify-between mt-4 space-x-4">
                <div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
                    <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{_productTile?.title}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">{_productTile?.price}</p>
                </div>
        </div>
        <button onClick={()=>{handleNavigateToProductDetailsPage(_productTile?.id)}} className="px-5 mt-5 py-2 rounded-none bg-amber-700 text-black font-bold text-lg">View Details</button>
        <button onClick={()=>handleAddToCart(ProductTile)} className="px-5 mt-5 py-2 rounded-none bg-amber-700 text-black font-bold text-lg">Add to Cart</button>
    </div>
 }

 export default ProductTile;