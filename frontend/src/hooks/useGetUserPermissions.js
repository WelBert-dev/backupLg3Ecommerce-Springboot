

export const useGetUserPermissions = ({userObj = null}, apiURL) => {

    switch (userObj.typeOfUser) {
        case 'commumUser':
            // realiza o fetch na API passando o objeto usuário
            break;
        case 'rootUser':
            // realiza o fetch na API 
            break;
        default:
            // nullUser
            break;
    }

}