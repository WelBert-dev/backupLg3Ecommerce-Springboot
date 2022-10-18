import React from 'react';

import { Link } from 'react-router-dom';

import { FaCartArrowDown } from 'react-icons/fa';

import MainRating from './MainRating';

import './MainCardProduct.css';


export default function MainCardProduct(props) {

    const { product, showLink = false } = props;

    const getLocalStorage = () => JSON.parse(localStorage.getItem('db_cart')) ?? [];
    const setLocalStorage = (dbCart) => localStorage.setItem("db_cart", JSON.stringify(dbCart));

    const createSingleItemProductInCart = (objSingleItemProduct) => {
        const dbCart = getLocalStorage();

        // verifica se ja existe o produto na lista, para epenas mudar a quantidade

        if(dbCart.find(x => x.idOfProduct === String(objSingleItemProduct.idOfProduct))){
            let indexOfProduct = dbCart.findIndex(x => x.idOfProduct === String(objSingleItemProduct.idOfProduct));
            updateSingleItemProductInCart(indexOfProduct, objSingleItemProduct);
        }else {
            dbCart.push(objSingleItemProduct);
            setLocalStorage(dbCart);
        }
    }

    const updateSingleItemProductInCart = (index, objSingleProduct) => {
        const dbCart = getLocalStorage();
        dbCart[index] = objSingleProduct;
        setLocalStorage(dbCart);
    }

    const deleteSingleItemProductInCart = (index) => {
        const dbCart = getLocalStorage();
        dbCart.splice(index, 1);
        setLocalStorage(dbCart);
    }

    function sumQtdTotalSelected()
    {
        // SingleItemProductForCart
        let sum = Number(0);
        for(let i = 0; i < getLocalStorage().length; i++)
        {
            console.log("sinlge", getLocalStorage()[i].qtdSelected);
            sum += Number(getLocalStorage()[i].qtdSelected);
        }

        return sum;
    }

    function handleIconCardProductClick (idOfProductSelected) {
        
        // aciona o modal
        const objDivCardProduct = document.querySelector(`.cardId-${idOfProductSelected}`);
        const objDivBlurContainer = document.querySelector(`.containerBlur-ByProductId-${idOfProductSelected}`);

        objDivCardProduct.classList.toggle("isActive");
        objDivBlurContainer.classList.toggle("isActive");


        const objIcon =  document.querySelector(`.iconId-${idOfProductSelected}`); 

        // pega o produto que foi adicionado no cart


        // finalmente adiciona no cart
        // props.history.push(`/cart/${product.id}`);
    }

    function handleCancelModalSingleProductClick(idOfProductSelected) {
        const objDivCardProduct = document.querySelector(`.cardId-${idOfProductSelected}`);
        const objDivBlurContainer = document.querySelector(`.containerBlur-ByProductId-${idOfProductSelected}`);

        objDivCardProduct.classList.toggle("isActive");
        objDivBlurContainer.classList.toggle("isActive");
    }

    function handleConfirmModalSingleProductClick(idOfProductSelected) {
        // desativa modal
        const objDivCardProduct = document.querySelector(`.cardId-${idOfProductSelected}`);
        const objDivBlurContainer = document.querySelector(`.containerBlur-ByProductId-${idOfProductSelected}`);
        const objIconMainCart = document.querySelector(".icon-mainCart");
        const objIconSingleProduct = document.querySelector(`.iconId-${idOfProductSelected}`);

        objDivCardProduct.classList.toggle("isActive");
        objDivBlurContainer.classList.toggle("isActive");

        // seta no icon do singleCardProduct a quantidade de produto selecionado
        const objInputQtdOfProduct = document.querySelector(`#productSingleQtdOfId-${idOfProductSelected}`)
        var quantidadeDesejada = Number(objInputQtdOfProduct.value);

        console.log(getLocalStorage(), "Id do produto: ", idOfProductSelected);
        if (Number(quantidadeDesejada) === 0 && getLocalStorage().find(x => x.idOfProduct === String(idOfProductSelected)))
        {
            let indexOfProduct = getLocalStorage().findIndex(x => x.idOfProduct === String(idOfProductSelected));

            console.log("Antes de deletar", getLocalStorage());
            deleteSingleItemProductInCart(indexOfProduct);
            console.log("depois", getLocalStorage());
            if(objIconSingleProduct.children[0].childElementCount > 1)
            {
                // icon do single card
                objIconSingleProduct.children[0].children[1].outerHTML="";
            }
            // icon do botão na navbar
            

            if(objIconMainCart.childElementCount > 1){
                objIconMainCart.children[1].textContent = sumQtdTotalSelected();
                if (Number(objIconMainCart.children[1].textContent) <= 0)
                {
                    objIconMainCart.children[1].outerHTML="";
                }

            }else {
                const filhoQtdProdutos = document.createElement("span");
                filhoQtdProdutos.appendChild(document.createTextNode(sumQtdTotalSelected()));
                objIconMainCart.children[1].appendChild(filhoQtdProdutos);
                console.log(objIconMainCart.children[1]);
            } 

            // if (Number(objIconMainCart.children[1].textContent) == 0)
            // {
            //     // verifica se é outro contexto e evita re-append
                
            //     objIconMainCart.children[1].outerHTML = getLocalStorage().find(x => x.idOfProduct === String(product.id)).qtdSelecte
            // }

        }
        if (quantidadeDesejada)
        {
            // Manipulação do dom para setar a quantidade selecinada no icon card single
            const filhoQtdProdutos = document.createElement("span");
            filhoQtdProdutos.setAttribute("id", `qtdSelecionadaByProductId-${idOfProductSelected}`)
    
            // verifica se é outro contexto e evita re-append
            if(objIconSingleProduct.children[0].childElementCount > 1){
                objIconSingleProduct.children[0].children[1].textContent = quantidadeDesejada;
            }else {
                filhoQtdProdutos.appendChild(document.createTextNode(quantidadeDesejada));
                objIconSingleProduct.children[0].appendChild(filhoQtdProdutos);
            }    
            
            // Armazena no localstorage

            const SingleItemProductForCart = {
                idOfProduct: idOfProductSelected,
                qtdSelected: quantidadeDesejada,
            }

            createSingleItemProductInCart(SingleItemProductForCart);

            // icon-mainCart
            // Manipulação do dom para setar a quantidade selecinada no icon main card (navbar)

            // verifica se é outro contexto e evita re-append
            if(objIconMainCart.childElementCount > 1){
                // mais que um apenas seta o textnode
                objIconMainCart.children[1].textContent = sumQtdTotalSelected();
            }else {
                const filhoQtdProdutosMain = document.createElement("span");
                filhoQtdProdutosMain.appendChild(document.createTextNode(sumQtdTotalSelected()));
                objIconMainCart.appendChild(filhoQtdProdutosMain);
            }    
        }     
    }

    return (
    <>
    <div key={product.id} className="main-cardProduct">
        <Link to={ showLink ? `/product/${product.id}`: '#'}>
            <div className="wrapperImage">
                <img className="img--mediumSize" src={product.image} alt={product.description} />
            <span className={`iconId-${product.id}`} onClick={() => handleIconCardProductClick(product.id)}><i><FaCartArrowDown />
            {
                JSON.parse(localStorage.getItem('db_cart')) ? 
                (
                    JSON.parse(localStorage.getItem('db_cart')) || JSON.parse(localStorage.getItem('db_cart')).find(x => x.idOfProduct === String(product.id)).qtdSelected <= 0 ? 
                    (JSON.parse(localStorage.getItem('db_cart')).find(x => x.idOfProduct === String(product.id)) ? 
                    (<span id={`qtdSelecionadaByProductId-${product.id}`}>{         
                      JSON.parse(localStorage.getItem('db_cart')).find(x => x.idOfProduct === String(product.id)).qtdSelected
                    }</span>):""):""                    
                ) : ""
                
            }</i></span>
                <MainRating id={product.id} rating={product.rating} numReviews={product.numReviews} />
                <div className="burger-title--container">
                    <h1 className="burger-title">{product.name}</h1>
                    <span className="burger-price"><p>{Intl.NumberFormat("en-US", {
                                                style: "currency", 
                                                currency: "USD"}).format(Number(product.price))}</p></span>
                </div>
            </div>              
            
        </Link>
    </div>
    <div className={`containerBlur containerBlur-ByProductId-${product.id}`} >

    </div>    
    <div className={`modalSingleProductClick cardId-${product.id}`}>
        <img src={`${product.image}`} />
        <div>
            <h1 className="burger-title colorGreen">{product.name} <MainRating id={product.id} rating={product.rating} /></h1>
            <p className="descriptionOfSingleProduct">
                {product.description}
            </p>
            <div className="containerQuantidadeProduto">
                <label>Vai querê quantu?</label>
                <input id={`productSingleQtdOfId-${product.id}`} type="number" min="0" max="100"/>
            </div> 
            <div className="containerButtonsModalSingleProduct">
                <button onClick={() => handleConfirmModalSingleProductClick(product.id)} className="btnModalSingleProduct">Confirmar</button>
                <button onClick={() => handleCancelModalSingleProductClick(product.id)} className="btnModalSingleProduct -danger">Cancelar</button>
            </div>
        </div>
    </div>
    </>
    )
};