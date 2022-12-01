const getUserMock_localStorage = () => JSON.parse(localStorage.getItem('db_userMock')) ?? [];

const getUserSessionMock_localStorage = () => JSON.parse(localStorage.getItem('db_userSessionMock')) ?? false;

export const isAuthenticated = () => {
// Acessa localstorage e verifica se tem token, 
// Se não tiver, redireciona usuário para a tela de login.
       
    if (typeof getUserMock_localStorage() !== 'undefined' && getUserMock_localStorage().length > 0 && getUserSessionMock_localStorage()) {
        // usuário está autenticado
        return true;
    }
   
    return false;
}
   
   
export const isRootUser = () => {
// Acessa localstorage e verifica se tem token,
// Faz uma requisição com ela, para verificar se usuário é root,  
// se nenhuma dessas condições ser satisfeita, return false e deixa responsabilidades para o chamador 
    
    if (typeof getUserMock_localStorage() !== 'undefined' && getUserMock_localStorage().length > 0 && getUserSessionMock_localStorage() && getUserMock_localStorage()[0].perfilPermissions == 2) {
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
