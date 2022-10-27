package com.example.demo.controller;


import com.example.demo.model.UserModel;
import com.example.demo.repository.IUserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuario")
public class UserController {
    private final IUserRepository _userRepository;
    private final PasswordEncoder _encoder;

    public UserController(IUserRepository userRepository, PasswordEncoder encoder) {
        this._userRepository = userRepository;
        this._encoder = encoder;
    }

    @GetMapping("/listarTodos")
    public ResponseEntity<List<UserModel>> listarTodos() {
        return ResponseEntity.ok(_userRepository.findAll());
    }

    @PostMapping("/salvar")
    public ResponseEntity<UserModel> salvar(@RequestBody UserModel usuario) {
        usuario.setPassword(_encoder.encode(usuario.getPassword()));
        return ResponseEntity.ok(_userRepository.save(usuario));
    }

    @GetMapping("/validarSenha")
    public ResponseEntity<Boolean> validarSenha(@RequestParam String login,
                                                @RequestParam String password) {

        Optional<UserModel> optUsuario = _userRepository.findByLogin(login);
        if (optUsuario.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }

        UserModel usuario = optUsuario.get();
        boolean valid = _encoder.matches(password, usuario.getPassword());

        HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(valid);
    }
}
