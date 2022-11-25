package com.example.demo.dtos;

import com.example.demo.enums.permissionProfileUserEnum;
import com.example.demo.models.UserModel;
public class UserDTO {

    private Integer id;
    private String login;
    //private String password; <- responsabilidade do Dominio (UserModel)
    private String firstName;
    private String lastName;
    private String email;
    permissionProfileUserEnum perfilPermissao;

    public UserDTO() {
    }
    public UserDTO(UserModel user) {
        id = user.getId();
        login = user.getLogin();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        email = user.getEmail();
        perfilPermissao = user.getPerfilPermissao();
        System.out.println(this.perfilPermissao.getNomeRelatorio());
    }

    public UserDTO(UserAccountDTO user) {
        id = user.getId();
        login = user.getLogin();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        email = user.getEmail();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
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

    public permissionProfileUserEnum getPerfilPermissao() {
        return perfilPermissao;
    }

    public void setPerfilPermissao(permissionProfileUserEnum perfilPermissao) {
        this.perfilPermissao = perfilPermissao;
    }
}
