import React, { useEffect, useRef } from 'react';

import { FaBars, FaTimes } from 'react-icons/fa';
import { FaCartArrowDown } from 'react-icons/fa';
import { FcSearch } from 'react-icons/fc';

import './MainNavbar.css';

export default function MainNavbar() {

    const navRef = useRef();
    
    const getLocalStorage = () => JSON.parse(localStorage.getItem('db_cart')) ?? [];
    const setLocalStorage = (dbCart) => localStorage.setItem("db_cart", JSON.stringify(dbCart));
	
    const params = window.location.href.substring(1).split("/")[3];
    console.log(params);

    const showNavbar = () => {
        
        if (navRef.current.classList.toggle("responsive_nav"))
        { // responsivo ativo e botao precionado
            document.getElementById("btn-hamburguer").style.display = 'none';
            document.getElementById("btn-hamburguer").style.position = 'relative';
            document.getElementById("navbar-container").classList.remove("responsive_nav-opacityZero");
            document.getElementById("navbar-container").classList.add("responsive_nav-opacityUm");
            // console.log("entrou no if");
        }else 
        {
            document.getElementById("btn-hamburguer").style.display = 'block';
            document.getElementById("btn-hamburguer").style.position = 'fixed';
            document.getElementById("navbar-container").classList.remove("responsive_nav-opacityUm");
            document.getElementById("navbar-container").classList.add("responsive_nav-opacityZero");
            // console.log("else");
        }  
    };

    function sumQtdTotalSelected()
    {
        // SingleItemProductForCart
        let sum = Number(0);
        for(let i = 0; i < getLocalStorage().length; i++)
        {
            // console.log("sinlge", getLocalStorage()[i].qtdSelected);
            sum += Number(getLocalStorage()[i].qtdSelected);
        }

        return sum;
    }

    return (
        <>
            <nav id="navbar-container" ref={navRef} >
                <button id="nav-close-btn" className="nav-btn nav-close-btn" onClick={showNavbar}><FaTimes /></button>
                <a href="/">Home</a>
                <div className="main-search--container -gapNone">
                    <div><input type="text"></input></div>
                    <div><FcSearch></FcSearch></div>                  
                </div>
                <div>
                    <a href="/cart">Carrinho<i className="icon-mainCart"><FaCartArrowDown />
                    {
                        JSON.parse(localStorage.getItem('db_cart')) ? 
                        (JSON.parse(localStorage.getItem('db_cart')).length > 0 ? 
                        <span>{//JSON.parse(localStorage.getItem('db_cart')).length
                            //sum += JSON.parse(localStorage.getItem('db_cart')).map(x => x.qtdSelected)
                            // JSON.parse(localStorage.getItem('db_cart')).length
                            sumQtdTotalSelected()
                        }</span> :
                        ""
                        ): ""
                    }
                    </i></a>
                    <a href="/signin">Logar</a>     
                </div>     
            </nav>
            <button id="btn-hamburguer" className="nav-btn" onClick={showNavbar}><FaBars /></button>
        </>
        

    )
};
