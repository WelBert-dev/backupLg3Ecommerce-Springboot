import React, { useEffect, useRef } from 'react';

import { FaBars, FaTimes } from 'react-icons/fa';
import { FaCartArrowDown } from 'react-icons/fa';

import './MainNavbar.css';

export default function MainNavbar() {

    const navRef = useRef();

    useEffect(()=>{
        console.log("Alterou");
    },[localStorage])

    const showNavbar = () => {
        
        if (navRef.current.classList.toggle("responsive_nav"))
        { // responsivo ativo e botao precionado
            document.getElementById("btn-hamburguer").style.display = 'none';
            document.getElementById("btn-hamburguer").style.position = 'relative';
            document.getElementById("navbar-container").classList.remove("responsive_nav-opacityZero");
            document.getElementById("navbar-container").classList.add("responsive_nav-opacityUm");
            console.log("entrou no if");
        }else 
        {
            document.getElementById("btn-hamburguer").style.display = 'block';
            document.getElementById("btn-hamburguer").style.position = 'fixed';
            document.getElementById("navbar-container").classList.remove("responsive_nav-opacityUm");
            document.getElementById("navbar-container").classList.add("responsive_nav-opacityZero");
            console.log("else");
        }  
    };

    var sum = Number(0);
    return (
        <>
            <nav id="navbar-container" ref={navRef} >
                <button id="nav-close-btn" className="nav-btn nav-close-btn" onClick={showNavbar}><FaTimes /></button>
                <a href="/">Home</a>
                <div>
                    <a href="/cart">Carrinho<i className="icon-mainCart"><FaCartArrowDown />
                    {
                        JSON.parse(localStorage.getItem('db_cart')) ? 
                        (JSON.parse(localStorage.getItem('db_cart')).length > 0 ? 
                        <span>{//JSON.parse(localStorage.getItem('db_cart')).length
                            //sum += JSON.parse(localStorage.getItem('db_cart')).map(x => x.qtdSelected)
                            JSON.parse(localStorage.getItem('db_cart')).length
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