package com.example.demo.services;

import com.example.demo.dtos.UserDTO;
import com.example.demo.enums.permissionProfileUserEnum;
import com.example.demo.models.UserModel;
import com.example.demo.repositories.IUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final IUserRepository _userRepository;
    private final PasswordEncoder _encoder;

    public UserService(IUserRepository userRepository, PasswordEncoder encoder) {
        this._userRepository = userRepository;
        this._encoder = encoder;
    }

    public List<UserDTO> listarTodos() {
       List<UserModel> usersEntity = _userRepository.findAll();
       List<UserDTO> usersDTO = new ArrayList<>();

       if (usersEntity.size() > 0 && !usersEntity.isEmpty()) {
           for(int i = 0; i < usersEntity.size(); i++) // Mapper and Parsing Entity <=> DTO
           {
               UserDTO userDTO = new UserDTO(usersEntity.get(i));
               usersDTO.add(userDTO);
           }

           return usersDTO;
       }

       return null;
    }

    public UserDTO findByLogin(String login) {

        UserModel userEntity = _userRepository.findByLogin(login).get();

        if (userEntity != null)
        {
            return new UserDTO(userEntity);
        }

       return null;
    }

    public UserDTO salvar(UserModel user) {

        if (user != null && UserModel.isValid(user)) {
            user.setPassword(_encoder.encode(user.getPassword())); // override, criptografa
            user.setPerfilPermissao(permissionProfileUserEnum.PERFIL_REGULAR_USER); // <- regra de negocio

            _userRepository.save(user);

            UserDTO userDTO = new UserDTO(user);
            return userDTO;
        }

        return null;
    }

    public List<UserDTO> atualizar(UserModel user) {
        user.setPassword(_encoder.encode(user.getPassword())); // override, criptografa

        if (!UserModel.isValid(user) && !isValidToUpdate(user, user.getId())) {
            return null;
        }

        if(_userRepository.existsByLogin(user.getLogin()) && _userRepository.findByLogin(user.getLogin()).get().getId() == user.getId() || !_userRepository.existsByLogin(user.getLogin())) {


            UserModel userEntityOld = _userRepository.findById(user.getId()).get();
            UserModel userEntityNew = new UserModel();

            userEntityNew.setId(userEntityOld.getId()); // <- O Id sempre continuará o mesmo!!!
            userEntityNew.setLogin(user.getLogin());
            userEntityNew.setPassword(user.getPassword());
            userEntityNew.setFirstName(user.getFirstName());
            userEntityNew.setLastName(user.getLastName());
            userEntityNew.setEmail(user.getEmail());
            userEntityNew.setPerfilPermissao(userEntityOld.getPerfilPermissao()); // <- regra de negócio

            UserDTO userDTOOld = new UserDTO(userEntityOld); // pois tava passando a msm referencia
            _userRepository.save(userEntityNew);

            List<UserDTO> userOldAndNew = new ArrayList<>();
            userOldAndNew.add(userDTOOld);
            userOldAndNew.add(new UserDTO(userEntityNew));
            return userOldAndNew;

        }

        return null;
    }

    public UserModel deletar(int id) {

        // id pois é de controle interno, então não precisamos passar um usuário completo.

        UserModel user = _userRepository.findById(id).get();

        if(user != null) {
            _userRepository.delete(user);
            return user;
        }

        return null;
    }

    public boolean isValidToUpdate(UserModel user, int id) {
        if (user.getId() != null && _userRepository.existsById(id)) {
            return true;
        }

        return false;
    }
}
