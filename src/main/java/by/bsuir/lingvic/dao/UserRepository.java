package by.bsuir.lingvic.dao;

import by.bsuir.lingvic.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByLogin(String login);
    User findByLoginAndPassword(String login, String password);
}
