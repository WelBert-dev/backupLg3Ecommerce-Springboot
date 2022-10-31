package com.example.demo.service;

import com.example.demo.data.UserDatailData;
import com.example.demo.model.UserModel;
import com.example.demo.repository.IUserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDatailServiceImpl implements UserDetailsService{
    private final IUserRepository _userRepository;

    public UserDatailServiceImpl(IUserRepository userRepository) {
        this._userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserModel> usuario = _userRepository.findByLogin(username);
        if (usuario.isEmpty()) {
            throw new UsernameNotFoundException("Usuário [" + username + "] não encontrado");
        }

        return new UserDatailData(usuario);
    }
}


