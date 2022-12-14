package com.example.demo.controllers;

import com.example.demo.dtos.UserDTO;
import com.example.demo.models.UserModel;

import com.example.demo.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    // Fonte boa com boas praticas REST: https://erickosma.medium.com/m%C3%A9todos-http-spring-rest-2aaff69d0a6f
    private final UserService _userService;
    private final PasswordEncoder _encoder;

    public UserController(UserService userService, PasswordEncoder encoder) {
        this._userService = userService;
        this._encoder = encoder;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UserDTO>> getAll() {
        System.out.println("Entrou no controller");
        List<UserDTO> allUsers = _userService.listarTodos();

        if (allUsers.size() > 0 && !allUsers.isEmpty()) {
            return new ResponseEntity<List<UserDTO>>(allUsers, HttpStatus.OK);
        }

        List<UserDTO> empty = new ArrayList<>();
        return new ResponseEntity<List<UserDTO>>(empty, HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/{String}")
    public ResponseEntity<UserDTO> getByLogin(@PathVariable String login) {
        UserDTO user = _userService.findByLogin(login);

        if (user != null) {

            return new ResponseEntity<UserDTO>(user, HttpStatus.OK);
        }

        UserDTO empty = new UserDTO();
        return new ResponseEntity<UserDTO>(empty, HttpStatus.NOT_FOUND);
    }


//    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
//    public @ResponseBody ResponseEntity<UserDTO> create(
//            UserAccountDTO user) {
//        System.out.println("Dentro do comntrolelelele");
//        System.out.println(user.getLogin());
//
//        if (_userService.salvar(user) != null) {
//
//            UserDTO userDTO = new UserDTO(user);
//            return new ResponseEntity<UserDTO>(userDTO, HttpStatus.CREATED);
//        }
//
//        UserDTO empty = new UserDTO();
//        return new ResponseEntity<UserDTO>(empty, HttpStatus.BAD_REQUEST);
//    }
    @PostMapping("/create")
    public ResponseEntity<UserDTO> create(@RequestBody UserModel user) {

        if (_userService.salvar(user) != null) {

            UserDTO userDTO = new UserDTO(user);
            return new ResponseEntity<UserDTO>(userDTO, HttpStatus.CREATED);
        }

        UserDTO empty = new UserDTO();
        return new ResponseEntity<UserDTO>(empty, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update")
    public ResponseEntity<List<UserDTO>> atualizar(@RequestBody  UserModel user) {

        if (user != null && UserModel.isValid(user)) {
            List<UserDTO> userOldAndNew = _userService.atualizar(user);

           if (userOldAndNew != null && userOldAndNew.size() == 2) {

               return new ResponseEntity<List<UserDTO>>(userOldAndNew, HttpStatus.OK);
           }

           List<UserDTO> empty = new ArrayList<>();
           return new ResponseEntity<List<UserDTO>>(empty, HttpStatus.NOT_FOUND);
        }

        List<UserDTO> empty = new ArrayList<>();
        return new ResponseEntity<List<UserDTO>>(empty, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UserModel> deletar(@PathVariable(name = "id") int id) {
        if (id != 0) {
            UserModel user = _userService.deletar(id);

            return new ResponseEntity<UserModel>(user, HttpStatus.valueOf(405));
        }

        UserModel empty = new UserModel();
        return new ResponseEntity<UserModel>(empty, HttpStatus.NOT_FOUND);
    }

//    @GetMapping("/validarSenha")
//    public ResponseEntity<Boolean> validarSenha(@RequestParam String login,
//                                                @RequestParam String password) {
//
//        Optional<UserModel> optUsuario = _userRepository.findByLogin(login);
//        if (optUsuario.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
//        }
//
//        UserModel usuario = optUsuario.get();
//        boolean valid = _encoder.matches(password, usuario.getPassword());
//
//        HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
//        return ResponseEntity.status(status).body(valid);
//    }
}
