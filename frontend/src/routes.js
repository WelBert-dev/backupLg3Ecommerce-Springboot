import React from 'react';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { isAuthenticated } from './auth.js';
import { isRootUser } from './auth';

import App from './App';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';

// react Component (Stataless ou seja não armazena estados)
// então o mesmo pode ser definido como uma função que retorna outra.

// BrowserRouter: Empacota tudo e possibilita controlar rotas, 
// e a manipular URL com mais facilidade

// Switch: Garante que apenas a primeira ocorrência de rotas será chamada,
// Pois o BrowserRouter "deixa" matchs em componentes que ouvem a mesma rota
// então o mesmo abriria as duas, o Switch garante que será apenas a primeira


// Implementa as Rota em geral:

const MainRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<App />} >
                <Route path="/" element={<HomeScreen />} exact/>
                {/*<Route path="cart" element={<CartScreen />} />*/}
                <Route path="/signin" element={<SigninScreen />} />

                <Route exact 
                        path='/logado' 
                        element={<RequireAuth>
                                    <h1>Você está logado</h1>
                                </RequireAuth>}>
                </Route>    

                <Route exact 
                        path='/rootArea' 
                        element={<RequireRootUser>
                                    <h1>Area do Super Usuário ;D</h1>
                                </RequireRootUser>}>
                </Route>    

                <Route exact 
                        path='/cart' 
                        element={<RequireAuth>
                                    <h1>Você está no carrinho</h1>
                                </RequireAuth>}>
                </Route>  
            </Route>
        </Routes>
    </BrowserRouter>

);


function RequireAuth({ children }) {
    let auth = isAuthenticated();
    //let location = useLocation();
  
    if (!auth) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/signin"  />; // <- dentro dele state={{ from: location }}
    }
  
    return children;
  }


  function RequireRootUser({ children }) {
    let auth = isRootUser();
    //let location = useLocation();
  
    if (!auth) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/signin"  />; // <- dentro dele state={{ from: location }}
    }
  
    return children;
  }

/*
const PrivateRouteLogado = () => {
    const auth = isAuthenticated(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/signin" />;
}

const PrivateRouteRootArea = () => {
    const root = isRootUser(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return root ? <Outlet /> : <Navigate to="/signin" />;
}

// Rota privada para logado
/*


const PrivateRouteLogado = ({ element: Component, ...rest }) => (

<Route { ...rest } render={props => (
	isAuthenticated() ? ( // renderira o componente
		<Component { ...props } />	
	):(
		// Se não, redireciona para a tela de autentição/login
		// state garante que usuário não perca o histórico de ações e etc.
		// devido ao re-load

		<Navigate to={{ pathname: '/sigin', state: { from: props.location } }} />
	) 
)}/>

);



// Rota privada para admin

const PrivateRouteRootArea = ({ component: Component, ...rest }) => (

<Route { ...rest } render={props => (
	isRootUser() ? ( // renderira o componente
		<Component { ...props } />	
	):(
		// Se não, redireciona para a tela de autentição/login
		// state garante que usuário não perca o histórico de ações e etc.
		// devido ao re-load
		
		<Navigate to={{ pathname: '/sigin', state: { from: props.location } }} />
	) 
)}/>

); */


export default MainRoutes;
