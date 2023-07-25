import React, {useState} from 'react';
import './App.css';
import { getCategories } from './fetcher';

import ProductDetail from './Components/productDetail';
import Basket from './Components/basket';
import Checkout from './Components/checkout';
import Category from './Components/category';
import Layout from './Components/layout';
import Home from './Components/home';
import OrderConfirmation from './Components/orderConfirmation';
import SearchResults from './Components/searchResult';

import {BrowserRouter,
Routes,
Route,
} from "react-router-dom";



function App() {
  const [categories, setCategories] = useState({
    errorMessage: '', 
    data: [], 
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    };
    fetchData();
  }, []);

  return (
    <>
<BrowserRouter>
        <Routes>
    <Route path="/" element={<Layout categories={categories}/>}>
       <Route index element={<Home />} />
       <Route path="basket" element={<Basket/>} />
       <Route path="checkout" element={<Checkout/>} />
       <Route path="orderconfirmation" element={<OrderConfirmation />} />
       <Route path="search" element={<SearchResults />} />
       <Route
        path="products/:productId"
        element={<ProductDetail />} 
        />
       <Route
        path="categories/:categoryId"
        element={<Category />} 
        />
         </Route>
       </Routes>
     </BrowserRouter> 
    </>
  );
}

export default App;
