import React from 'react';

import MainCardProduct from './MainCardProduct';

import data from '../data';

// import './WrapperProducts.css';

export default function WrapperProducts() {

    const products = data.products;

    return (
    <div className="wrapper-products">
        {
            products.map(product => (
            <MainCardProduct key={product.id} product={product} showLink={true}/>
            ))
        }  
    </div>
    )
};