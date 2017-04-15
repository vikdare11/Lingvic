package by.bsuir.lingvic.controller;

import by.bsuir.lingvic.dao.TeacherRepository;
import by.bsuir.lingvic.domain.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Вика on 15.04.2017.
 */
@RestController
public class TeacherController {
    @Autowired
    private TeacherRepository teacherRepository;

    @RequestMapping("/teacher/all")
    @ResponseBody
    public List<Teacher> getAllTeachers() {
        List<Teacher> teachers = (List<Teacher>) teacherRepository.findAll();
        return teachers;
    }
}
