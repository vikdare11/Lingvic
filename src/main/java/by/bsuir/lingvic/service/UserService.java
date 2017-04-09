package by.bsuir.lingvic.service;

import by.bsuir.lingvic.domain.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();
    User getUserById(Long id);
    void createUser(User user);
    void updateUserById(User user);
    void deleteUserById(Long id);
    User findByLogin(String login);
    User findUserByLoginAndPassword(String login, String password);
}