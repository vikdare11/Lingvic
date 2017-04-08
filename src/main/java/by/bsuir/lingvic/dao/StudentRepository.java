package by.bsuir.lingvic.dao;

import by.bsuir.lingvic.domain.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {
}
