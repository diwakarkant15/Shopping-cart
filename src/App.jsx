import { Fragment } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProductList from './pages/productList'
import CartList from './pages/cartDetails'
import ProductDetails from './pages/productDetails'

function App() {
  
  return (
    <>
    <Fragment>
      <Routes>
        <Route path="/product-list" element={<ProductList/>}/>
        <Route path="/product-details/:id" element={<ProductDetails/>}/>
        <Route path="/cart-list" element={<CartList/>}/>
      </Routes>
    </Fragment>
      
    </>
  )
}

export default App
