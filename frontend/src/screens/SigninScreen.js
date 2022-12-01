import React from 'react';

import './SigninScreen.css';

export default function SigninScreen() {

	const getUserMock_localStorage = () => JSON.parse(localStorage.getItem('db_userMock')) ?? [];
	const setUserMock_localStorage = (dbUserMock) => localStorage.setItem("db_userMock", JSON.stringify(dbUserMock));

	const getUserSessionMock_localStorage = () => JSON.parse(localStorage.getItem('db_userSessionMock')) ?? false;
	const setUserSessionMock_localStorage = (dbSessionMock) => localStorage.setItem("db_userSessionMock", JSON.stringify(dbSessionMock));

	const readClient = () => getUserMock_localStorage();

	const deleteClient = (index) => {
		const dbClient = readClient();
		dbClient.splice(index, 1);
		setUserMock_localStorage(dbClient);
	}

	const updateClient = (index, client) => {
		const dbClient = readClient();
		dbClient[index] = client;
		setUserMock_localStorage(dbClient);
	}


	const createClient = (client) => {
		const dbClient = getUserMock_localStorage();
		dbClient = [];
		dbClient.push(client);
		setUserMock_localStorage(dbClient);
	}

	const createSessionMock = (session) => {
		setUserSessionMock_localStorage(session);
	}


	const isFormValid = () => {
		// faz a validação
		return true;
	}

	const isUserExists = (login, password) => {
		// verifica se usuário existe e esta ok
		if (readClient().find(x => x.login === String(login) && x.password === String(password))) {
			return true;
		}

		return false;
	}

	const handleOnSubmitForm = (e) => {
		e.preventDefault();
		console.log(e);
		
		if (isFormValid()) {
			// fetch na API referência: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
			
			const login = document.querySelector('#login_signin').value;
			const password = document.querySelector('#senha_signin').value;
			
			if (isUserExists(login, password)) {
				createSessionMock(true);
				window.location.replace("http://localhost:3000/");
			}else {
				createSessionMock(false);
				alert('Usuário inválido, tente novamente! ou crie uma conta! ;-;\nPara criar uma conta clicar em "Cadastrar-se logo abaixo \/"');
				console.log("uÉ");
			}	
		}
	}

	if (getUserSessionMock_localStorage() && getUserMock_localStorage().lenght > 0) {

	}

    return (
         <div className="main-signin--container" style={{background: `#FFFFFF url('/images/anabolizadu.png') no-repeat center center fixed`}}>   
	      <div id="login">
			<form method="post" onSubmit={(e) => handleOnSubmitForm(e)}> 
				<h1>Login</h1> 
				<p> 
					<label for="login_signin">Login</label>
					<input id="login_signin" name="login_signin" required="required" type="text" placeholder="ex. PamonhaMilGrau" />	
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
