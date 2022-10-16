import React, { useEffect } from 'react';

import WrapperProducts from '../components/WrapperProducts';

import './HomeScreen.css';

export default function HomeScreen() {

    useEffect(()=>{

        const getLocalStorage = () => JSON.parse(localStorage.getItem('db_cart')) ?? [];
        
        const dbCart = getLocalStorage();

        if (dbCart.length > 0)
        {
            console.log("pamonha", dbCart, dbCart.length);

            console.log("Definir aqui a quantidade de produtos selecionada nos cards no evento onload");
        }

        const objDivCardProduct = document.querySelector(`.cardId-1`);
        console.log(objDivCardProduct);
    },[])

    return (
        <div className="main-header--container">
            <WrapperProducts />
        </div>
    )
};