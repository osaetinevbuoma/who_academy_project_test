package org.who.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.who.project.db.entity.Course;
import org.who.project.db.entity.Student;
import org.who.project.db.repository.StudentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    /**
     * Get a paginated list of students.
     *
     * @param pageable  pageable object for pagination
     * @return          a Page object of Students
     */
    public Page<Student> listStudents(Pageable pageable) {
        return studentRepository.findAll(pageable);
    }

    /**
     * Get a student's detail.
     *
     * @param id    id of the student to get.
     * @return      an Optional object of students
     */
    public Optional<Student> getStudentDetail(int id) {
        return studentRepository.findById(id);
    }

    /**
     * Save a student object.
     * @param student    student entity to persist to DB
     * @return          a saved object
     */
    public Student saveStudent(Student student) {
        studentRepository.save(student);
        return student;
    }

    /**
     * Enroll a student in a selected course.
     *
     * @param course    Course to enroll student.
     * @param student   Student being enrolled in course.
     * @return          a student enrolled in course.
     */
    public Student enrollStudent(Student student) {
        studentRepository.save(student);
        return student;
    }
}
