package com.example.demo.dtos;

public class UserAccountDTO {

    // Classe criada por boas práticas, uma vez que para criar um usuário
    // precisamos de todas as informações "iniciais", que são as informações
    // presentes em UserModel, ou seja, esse DTO é uma completa cópia da mesma
    // com a simples diferença em que aqui não vamos deixar o "perfilPermissão",
    // pois essa responsabilidade disrespeito ao "Dominio" do sistema,
    // não ao usuário final.

    // Então para não trafegar Models/Entidades entre as camadas externas,
    // resolvi criar esse DTO específico para manutenções de conta,
    // como possiveis alterações: na senha, no login, no email... e etc
    // tudo que desrespeito a manutenções em que o usuário final pode mecher
    // vão estar presentes aqui.

    // Por enquanto o sistema é pequeno, então é real uma cópia da model UserModel,
    // más quando o sistema cresce mais detalhes vão sendo observados e modificados,
    // então é bom separar informações que o usuário final pode alterar sobre sí,
    // e deixar o "Dominínio" do sistema intacto (UserModel é um dos domínios do sistema)
    // ou seja, o mesmo é de controle do sistema, não do usuário final,
    // então separamos em classes essas responsabilidades.

    // As diferenças entre: UserModel, UserDTO, e UserAccountDTO são:

    // UserModel: Entidade príncipal do "Domínio" ou seja, da aplicação em sí aonde
    // a manipulação da mesma apenas disrespeito ao core.

    // UserDTO: Objeto de transferência entre as camadas (No caso entre serviço e controlador),
    // A Mesma disrespeito a camada de apresentação, aonde são informações necessárias para o frontEnd,
    // O Usuário ainda não pode manipular ela, pois também existem regras de negócio e ela também
    // disrespeito ao core do sistema, com a diferença entre as camadas (Ela é para o frontend manipular).

    // UserAccountDTO: Também é um objeto de transferência entre as camadas (entre serviço e controlador também),
    // Porém essa é de responsabilidade do usuário final, aonde os inputs é responsabilidade dele.

    private Integer id; // <- responsabilidade do Dominio (UserModel)
    private String login;
    private String password; // <-- Aqui retornamos pois o usuário final pode alterar. porém nao no userDTO
    private String firstName;
    private String lastName;
    private String email;
    //private permissionProfileUserEnum perfilPermissao; <- responsabilidade do Domínio (UserModel)

    public UserAccountDTO(Integer id, String login, String password, String firstName, String lastName, String email) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}
