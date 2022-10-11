import React from 'react';

import { Link } from 'react-router-dom';

import { FaCartArrowDown } from 'react-icons/fa';

import MainRating from './MainRating';

import './MainCardProduct.css';


export default function MainCardProduct(props) {

    const { product, showLink = true } = props;

    return (
    <div key={product.id} className="main-cardProduct">
        <Link to={ showLink ? `/product/${product.id}`: '#'}>
            <div className="wrapperImage">
                <img className="img--mediumSize" src={product.image} alt={product.description} />
                <span><i><FaCartArrowDown /></i></span>
                <div className="burger-title--container">
                    <h1 className="burger-title">{product.name}</h1>
                    <span className="burger-price"><p>{Intl.NumberFormat("en-US", {
                                                style: "currency", 
                                                currency: "USD"}).format(Number(product.price))}</p></span>
                </div>
            </div>              
            <MainRating rating={product.rating} numReviews={product.numReviews} />
        </Link>
    </div>
    )
};