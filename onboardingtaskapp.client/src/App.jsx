import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header/Header';
import CustomerList from './components/Customer/List';
import CustomerCreate from './components/Customer/Create';
import CustomerEdit from './components/Customer/Edit';
import ProductList from './components/Product/List';
import ProductCreate from './components/Product/Create';
import ProductEdit from './components/Product/Edit';
import StoreList from './components/Store/List';
import StoreCreate from './components/Store/Create';
import StoreEdit from './components/Store/Edit';
import SaleList from './components/Sale/List';
import SaleCreate from './components/Sale/Create';
import SaleEdit from './components/Sale/Edit';

function App() {   
    return (
        <>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CustomerList />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/stores" element={<StoreList />} />
                    <Route path="/sales" element={<SaleList />} />
                                        

                </Routes>
            </BrowserRouter>
        </>
    );
    
}

export default App;