package com.example.demo.repository;

import com.example.demo.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface IUserRepository extends JpaRepository<UserModel, Integer> {

    // Optional evita problemas de nullpointer except
    // o findBy.. é implementado pelo JPA
    public Optional<UserModel> findByLogin(String login);
}
