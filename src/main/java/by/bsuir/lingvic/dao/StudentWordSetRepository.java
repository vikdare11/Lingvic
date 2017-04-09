package by.bsuir.lingvic.dao;

import by.bsuir.lingvic.domain.Set;
import by.bsuir.lingvic.domain.Student;
import by.bsuir.lingvic.domain.StudentWordSet;
import org.springframework.data.repository.CrudRepository;

public interface StudentWordSetRepository extends CrudRepository<StudentWordSet, Long> {
    StudentWordSet findByStudentAndSet(Student student, Set set);
}
