import React from 'react';

import './SigninScreen.css';

export default function SigninScreen() {

    return (
        <div className="main-signin--container" style={{background: `#FFFFFF url('/images/anabolizadu.png') no-repeat center center fixed`}}>   
	      <div id="login">
			<form method="post" action=""> 
				<h1>Login</h1> 
				<p> 
					<label for="login_signin">Login</label>
					<input id="login_signin" name="login_signin" required="required" type="text" placeholder="ex. PamonhaMilGrau"/>
				</p>
				
				<p> 
					<label for="senha_signin">Senha</label>
					<input id="senha_signin" name="login_signin" required="required" type="password" placeholder="ex. pamonha123" /> 
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
					<a href="/signin/createAccount">Cadastre-se</a>
				</p>
			</form>
	      </div>
        </div>
    )
};
