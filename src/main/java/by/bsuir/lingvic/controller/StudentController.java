package by.bsuir.lingvic.controller;

import by.bsuir.lingvic.dao.SetRepository;
import by.bsuir.lingvic.dao.StudentRepository;
import by.bsuir.lingvic.dao.StudentWordSetRepository;
import by.bsuir.lingvic.domain.Set;
import by.bsuir.lingvic.domain.Student;
import by.bsuir.lingvic.domain.StudentWordSet;
import by.bsuir.lingvic.domain.request.StudentSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentWordSetRepository studentWordSetRepository;

    @Autowired
    private SetRepository setRepository;

    @RequestMapping("/student/all")
    @ResponseBody
    public List<Student> getAllStudents() {
        List<Student> students = (List<Student>) studentRepository.findAll();
        return students;
    }

   /* @RequestMapping("/student/{id}")
    @ResponseBody
    public Student getStudentById(@PathVariable("id") Long id) {
        return studentRepository.findOne(id);
    }
*/
    @RequestMapping(value = "/student/assign_set", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<Student>> assignSetToStudent(@RequestBody StudentSet studentSet) {
        StudentWordSet studentWordSet = studentWordSetRepository.findByStudentAndSet(
                new Student(){{
                    setUser_id(studentSet.getStudentId());
                }}
                ,
                new Set() {{
                    setId(studentSet.getSetId());
                }});

        if (studentWordSet != null) {
            studentWordSet.setChallengeDate(new Date());
            studentWordSet.setIsChallenged(studentSet.getIsChallenged());
            studentWordSetRepository.save(studentWordSet);
            return new ResponseEntity<List<Student>>((List<Student>) studentRepository.findAll(), HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
