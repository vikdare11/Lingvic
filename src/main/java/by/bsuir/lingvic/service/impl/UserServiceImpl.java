package by.bsuir.lingvic.service.impl;

import by.bsuir.lingvic.dao.RoleRepository;
import by.bsuir.lingvic.dao.UserRepository;
import by.bsuir.lingvic.domain.Role;
import by.bsuir.lingvic.domain.User;
import by.bsuir.lingvic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<User> getAllUsers() {

        return (List<User>) userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {

        return userRepository.findOne(id);
    }

    @Override
    public void createUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Set<Role> roles = new HashSet<>();
        roleRepository.findAll().forEach(roles::add);
        user.setRole(roles);
        userRepository.save(user);
    }

    @Override
    public void updateUserById(User user) {

        userRepository.save(user);
    }

    @Override
    public void deleteUserById(Long id) {

        userRepository.delete(id);
    }

    @Override
    public User findByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Override
    public User findUserByLoginAndPassword(String login, String password) {
        password = DigestUtils.md5DigestAsHex(password.getBytes());
        return userRepository.findByLoginAndPassword(login, password);
    }
}
