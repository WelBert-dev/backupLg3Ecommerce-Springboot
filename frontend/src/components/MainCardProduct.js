import React from 'react';

import { Link } from 'react-router-dom';

import { FaCartArrowDown } from 'react-icons/fa';

import MainRating from './MainRating';

import './MainCardProduct.css';


export default function MainCardProduct(props) {

    const { product, showLink = false } = props;

    const handleCardClick = (idOfProductSelected) => {
        
        const objDivCardProduct = document.querySelector(`.cardId-${idOfProductSelected}`);
        const objImgcardProduct = document.querySelector(`.imgId-${idOfProductSelected}`);
        const objBurgerTitleContainer = document.querySelector(`.burgerTitleContainerId-${idOfProductSelected}`);
        const objCardRating =  document.querySelector(`.cardRatingId-${idOfProductSelected}`);
        const objIcon =  document.querySelector(`.iconId-${idOfProductSelected}`); 

        var contador = Number(0);
        var flagRotateZero = false;
        // adiciona o evento quando o mouse sai do elemento
        function handleOnMouseLeave(){

            contador ++; // contador pois o evento é ativado 1 vez mesmo sem sair do elemento

            if(objDivCardProduct.classList.contains("rotateYTrue") && contador > 1)
            { // quer dizer que rodou
                objDivCardProduct.classList.remove("rotateYTrue");
                objDivCardProduct.style.transform = "rotateY(0)";
                
                flagRotateZero = true;

                objImgcardProduct.style.display = "initial";
                objBurgerTitleContainer.style.display = "initial";
                objCardRating.style.display = "block";
                objIcon.style.display = "initial";

                objDivCardProduct.removeEventListener("mouseout", handleOnMouseLeave);
                console.log("entrou no if do leave");
            }
            
        }
        objDivCardProduct.addEventListener("mouseout", handleOnMouseLeave);

        if(!objDivCardProduct.classList.contains("rotateYTrue") || flagRotateZero)
        { // quer dizer que nao rodou
            objDivCardProduct.classList.add("rotateYTrue");
            
            objImgcardProduct.style.display = "none";
            objBurgerTitleContainer.style.display = "none";
            objCardRating.style.display = "none";
            objIcon.style.display = "none";
            console.log("entrou no if de fora");

            // const filhoH1Title = document.createElement("h1");
            //const getFilhoDoTitleContainer = objBurgerTitleContainer.children
            // console.log(objBurgerTitleContainer.children.item)
            // filhoH1Title.appendChild(document.createTextNode("pamonha"));
            // objDivCardProduct.appendChild(filhoH1Title);
        }
        

        // finalmente adiciona no cart
        // props.history.push(`/cart/${product.id}`);
    }

    return (
    <div onClick={() => handleCardClick(product.id)} key={product.id} className={`main-cardProduct cardId-${product.id}`}>
        <Link to={ showLink ? `/product/${product.id}`: '#'}>
            <div className="wrapperImage">
                <img className={`img--mediumSize imgId-${product.id}`} src={product.image} alt={product.description} />
                <span className={`iconId-${product.id}`}><i><FaCartArrowDown /></i></span>
                <div className={`burger-title--container burgerTitleContainerId-${product.id}`}>
                    <h1 className="burger-title">{product.name}</h1>
                    <span className="burger-price"><p>{Intl.NumberFormat("en-US", {
                                                style: "currency", 
                                                currency: "USD"}).format(Number(product.price))}</p></span>
                </div>
            </div>              
            <MainRating id={product.id} rating={product.rating} numReviews={product.numReviews} />
        </Link>
    </div>
    )
};