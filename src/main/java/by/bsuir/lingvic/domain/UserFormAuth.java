package by.bsuir.lingvic.domain;

import java.io.Serializable;

/**
 * Created by Вика on 09.04.2017.
 */
public class UserFormAuth implements Serializable {
    private String login;
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
