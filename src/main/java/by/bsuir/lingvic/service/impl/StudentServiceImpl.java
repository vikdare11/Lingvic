package by.bsuir.lingvic.service.impl;

import by.bsuir.lingvic.dao.StudentRepository;
import by.bsuir.lingvic.domain.Student;
import by.bsuir.lingvic.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<Student> getAllStudents() {

        return (List<Student>) studentRepository.findAll();
    }

    @Override
    public Student getStudentById(Long id) {

        return studentRepository.findOne(id);
    }

    @Override
    public void createStudent(Student student) {

        studentRepository.save(student);
    }

    @Override
    public void updateStudentById(Student student) {

        studentRepository.save(student);
    }

    @Override
    public void deleteStudentById(Long id) {

        studentRepository.delete(id);
    }
}
