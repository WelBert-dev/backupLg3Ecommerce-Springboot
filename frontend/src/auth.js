const getLocalStorage = () => JSON.parse(localStorage.getItem('auth_token_JWT')) ?? [];
const setLocalStorage = (authTokenJWT) => localStorage.setItem("auth_token_JWT", JSON.stringify(authTokenJWT));


export const isAuthenticated = () => {
// Acessa localstorage e verifica se tem token, 
// Se não tiver, redireciona usuário para a tela de login.
       
    if (typeof getLocalStorage() !== 'undefined' && getLocalStorage.length > 0) {
        // usuário está autenticado
        return true;
    }
   
    return false;
}
   
   
export const isRootUser = () => {
// Acessa localstorage e verifica se tem token,
// Faz uma requisição com ela, para verificar se usuário é root,  
// se nenhuma dessas condições ser satisfeita, return false e deixa responsabilidades para o chamador 
    
    if (typeof getLocalStorage() !== 'undefined' && getLocalStorage().length > 0) {
        // usuário está autenticado, agora verificar se é rootUser
        // faz fetch na API POST /api/rootUserAuthenticated (Recebe um body JWT)
        // se userRoot == true api retorna 200 OK 
        
        var fetchBlabla = true; // mock
        if (fetchBlabla) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}
