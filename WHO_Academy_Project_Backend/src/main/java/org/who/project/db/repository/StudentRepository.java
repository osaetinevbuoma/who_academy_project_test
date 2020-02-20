package org.who.project.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.who.project.db.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
}
