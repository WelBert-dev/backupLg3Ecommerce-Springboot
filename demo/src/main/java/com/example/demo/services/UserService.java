package com.example.demo.services;

import com.example.demo.dtos.UserAccountDTO;
import com.example.demo.dtos.UserDTO;
import com.example.demo.enums.permissionProfileUserEnum;
import com.example.demo.models.UserModel;
import com.example.demo.repositories.IUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.ArrayList;
import java.util.List;

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

       if (usersEntity.size() > 0 && usersEntity != null) {
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

    public UserDTO salvar(UserAccountDTO user) {

        if (user != null) {
            System.out.println(user.getPassword());
            System.out.println(user.getLogin());
            user.setPassword(_encoder.encode(user.getPassword())); // override, criptografa

            UserModel userEntity = new UserModel();
            // userEntity.setId(); <- Serial
            userEntity.setLogin(user.getLogin());
            userEntity.setPassword(_encoder.encode(user.getPassword()));
            userEntity.setFirstName(user.getFirstName());
            userEntity.setLastName(user.getLastName());
            userEntity.setEmail(user.getEmail());
            userEntity.setPerfilPermissao(permissionProfileUserEnum.PERFIL_REGULAR_USER); // <- regra de negócio

            _userRepository.save(userEntity);

            UserDTO userDTO = new UserDTO(userEntity);
            return userDTO;
        }

        return null;
    }

    public List<UserDTO> atualizar(UserAccountDTO user) {
        user.setPassword(_encoder.encode(user.getPassword())); // override, criptografa

        UserModel userEntityOld = _userRepository.findById(user.getId()).get(); //_userRepository.findByLogin(user.getLogin()).get();

        // Esta atualizando, porém se o novo login ja existir?? não pode pois é unique

        if (userEntityOld != null && _userRepository.findByLogin(user.getLogin()).get() == null) {
            UserModel userEntityNew = new UserModel();
            userEntityNew.setId(userEntityOld.getId()); // <- O Id sempre continuará o mesmo!!!
            userEntityNew.setLogin(user.getLogin());
            userEntityNew.setPassword(user.getPassword());
            userEntityNew.setFirstName(user.getFirstName());
            userEntityNew.setLastName(user.getLastName());
            userEntityNew.setEmail(user.getEmail());
            userEntityNew.setPerfilPermissao(userEntityOld.getPerfilPermissao()); // <- regra de negócio

            _userRepository.save(userEntityNew);

            List<UserDTO> userOldAndNew = new ArrayList<>();
            userOldAndNew.add(new UserDTO(userEntityOld));
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
}
