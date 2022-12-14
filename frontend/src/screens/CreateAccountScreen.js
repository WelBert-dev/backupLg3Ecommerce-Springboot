import React from 'react';

import { Navigate } from 'react-router-dom';

import './CreateAccountScreen.css';

export default function CreateAccountScreen() {

	const getUserMock_localStorage = () => JSON.parse(localStorage.getItem('db_userMock')) ?? [];
	const setUserMock_localStorage = (dbUserMock) => localStorage.setItem("db_userMock", JSON.stringify(dbUserMock));

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
		var dbClient = getUserMock_localStorage();
		dbClient = [];
		dbClient.push(client);
		setUserMock_localStorage(dbClient);
	}

		// Example POST method implementation:
	async function fetchPostData(url = '', data = {}) {
		// Default options are marked with *
		// const response = await fetch(url, {
		// method: 'POST', 
		// mode: 'cors', // no-cors, *cors, same-origin
		// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		// credentials: 'same-origin', // include, *same-origin, omit
		// headers: {
		// 	'Content-Type': 'application/json'
		// 	// 'Content-Type': 'application/x-www-form-urlencoded',
		// },
		// redirect: 'follow', // manual, *follow, error
		// referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(data) // body data type must match "Content-Type" header
		// });
		// return response.json(); // parses JSON response into native JavaScript objects
		if (readClient().find(x => x.login === String(data.login)))
        {
            window.alert("Duplicidade detectada! Login existente, altere e tente novamente!! ;-;");

            // var filho = window.document.createElement("h1")
            // filho.setAttribute("id", "h1FailResult");
            // var texto  = document.createTextNode("ERRO!! \n;-;");
            // filho.appendChild(texto);
            // document.getElementById("conteudo-principal").appendChild(filho);

            // setTimeout(() => {
            //     document.getElementById("conteudo-principal").removeChild(document.getElementById("h1FailResult"));
            // }, 5000);
            
            return null;
        }

		createClient(data);
		return data;
		
	}

	const isFormValid = () => {
		// faz a valida????o
		return true;
	}
	const handleOnSubmitForm = (e) => {
		e.preventDefault();
		console.log(e);
		
		if (isFormValid) {
			// fetch na API refer??ncia: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
			
			const firstName = document.querySelector('#firstName_createAccount').value;
			const lastName = document.querySelector('#lastName_createAccount').value;
			const email = document.querySelector('#email_createAccount').value;
			const login = document.querySelector('#login_createAccount').value;
			const password = document.querySelector('#senha_createAccount').value;

			const objRegularUser = {
				"login":login,
				"password":password, 
				"firstName":firstName, 
				"lastName":lastName, 
				"email":email, 
				"perfilPermissions":1,
			};

			fetchPostData(process.env.URL_API_BASE + process.env.API_ENDPOINT_CREATEACCOUNT, 
				objRegularUser).then((data) => {
					console.log(data); // JSON data parsed by `data.json()` call
					if(data != "" && data != null)
					{
						window.location.replace("http://localhost:3000/signin/");
					} else {
						alert("Ocorreu um erro, tente novamente!");
					}
					
					});			
		}

	}

    return (
        <div className="main-signin--container" style={{background: `#FFFFFF url('/images/anabolizadu.png') no-repeat center center fixed`}}>   
	      <div id="createAccount">
			<form onSubmit={(e) => handleOnSubmitForm(e)}> 
				<h1>Entre com os seus dados ;D</h1> 
				<p> 
					<label for="firstName_createAccount">Nome:</label>
					<input id="firstName_createAccount" name="firstName_createAccount" required="required" type="text" placeholder="ex. Pamonha"/>
				</p>

                <p> 
					<label for="lastName_createAccount">Sobrenome:</label>
					<input id="lastName_createAccount" name="lastName_createAccount" required="required" type="text" placeholder="ex. da Silva"/>
				</p>

                <p> 
					<label for="email_createAccount">E-Mail</label>
					<input id="email_createAccount" name="email_createAccount" required="required" type="text" placeholder="ex. pamonha.silva@dominio.com"/>
				</p>

                <p> 
					<label for="login_createAccount">Login:</label>
					<input id="login_createAccount" name="login_createAccount" required="required" type="text" placeholder="ex. pamonhaMilGrau"/>
				</p>
				
				<p> 
					<label for="senha_createAccount">Senha</label>
					<input id="senha_createAccount" name="senha_createAccount" required="required" type="password" placeholder="ex. pamonha123" /> 
				</p>
				
				<p> 
					<input type="submit" value="Criar" /> 
				</p>

                <p> 
					<input type="reset" value="Limpar campos" /> 
				</p>
				
			</form>
	      </div>
        </div>
    )
};
