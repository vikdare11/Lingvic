package by.bsuir.lingvic.dao;

import by.bsuir.lingvic.domain.Teacher;
import org.springframework.data.repository.CrudRepository;

public interface TeacherRepository extends CrudRepository<Teacher, Long> {
}