package by.bsuir.lingvic.controller;

import by.bsuir.lingvic.dao.StudentRepository;
import by.bsuir.lingvic.domain.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @RequestMapping("/student/all")
    @ResponseBody
    public List<Student> getAllStudents() {
        List<Student> students = (List<Student>) studentRepository.findAll();
        return students;
    }

    @RequestMapping("/student/{id}")
    @ResponseBody
    public Student getStudentById(@PathVariable("id") Long id) {
        return studentRepository.findOne(id);
    }

}
