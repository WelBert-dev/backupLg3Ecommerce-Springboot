import React from 'react';

import './SigninScreen.css';

export default function SigninScreen() {

    return (
        <div className="main-signin--container" style={{background: `#FFFFFF url('/images/anabolizadu.png') no-repeat center center fixed`}}>   
	      <div id="login">
		<form method="post" action=""> 
		  <h1>Login</h1> 
		  <p> 
		    <label for="nome_login">E-Mail</label>
		    <input id="nome_login" name="email_login" required="required" type="text" placeholder="ex. contato@htmlecsspro.com"/>
		  </p>
		   
		  <p> 
		    <label for="email_login">Senha</label>
		    <input id="email_login" name="senha_login" required="required" type="password" placeholder="ex. senha" /> 
		  </p>
		   
		  <p> 
		    <input type="checkbox" name="manterlogado" id="manterlogado" value="" /> 
		    <label for="manterlogado">Manter-me logado</label>
		  </p>
		   
		  <p> 
		    <input type="submit" value="Logar" /> 
		  </p>
		   
		  <p class="link">
		    Ainda não tem conta?
		    <a href="#paracadastro">Cadastre-se</a>
		  </p>
		</form>
	      </div>
        </div>
    )
};
