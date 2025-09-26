/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ShoppingCartContext } from "../../components/context";
import ProductTile from "../../components/product-tile";

function ProductList(){

    const { listOfProducts, loading }= useContext(ShoppingCartContext);

    console.log(listOfProducts);
    
    if(loading) {
        return (
            <h1>Page loading. Please wait...</h1>
        )
    }

    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">Our featured Products</h2>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
                    {
                        listOfProducts && listOfProducts.length > 0 ? listOfProducts.map(_productTile => <ProductTile _productTile={_productTile}/>) : <h3>No products found</h3>
                    }
                </div>
            </div>
        </section>

    )
}

export default ProductList;