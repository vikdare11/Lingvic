package by.bsuir.lingvic.controller;

import by.bsuir.lingvic.domain.User;
import by.bsuir.lingvic.domain.UserFormAuth;
import by.bsuir.lingvic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class AuthController {
    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public ResponseEntity<User> auth(HttpServletRequest request, @RequestBody UserFormAuth user) {
        User foundUser = userService.findUserByLoginAndPassword(user.getLogin(), user.getPassword());

        if (foundUser != null) {
            return new ResponseEntity<User>(foundUser, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
