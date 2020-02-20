package org.who.project;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.who.project.db.entity.Course;
import org.who.project.db.entity.Student;
import org.who.project.db.repository.CourseRepository;
import org.who.project.db.repository.StudentRepository;
import org.who.project.service.StudentService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@DataJpaTest
public class StudentTestCases {
    @Autowired
    CourseRepository courseRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    TestEntityManager testEntityManager;

    private Course course;
    private Student student;
    private StudentService studentService;

    @BeforeEach
    void setUp() {
        studentService = new StudentService(studentRepository);

        course = new Course(Utilities.COURSE_NAME);
        student = new Student(Utilities.STUDENT_FIRST_NAME, Utilities.STUDENT_LAST_NAME);
    }

    @AfterEach
    void destroy() {
        studentRepository.deleteAll();
    }

    @Test
    void testCreateStudentMethod() {
        studentService.saveStudent(student);

        Optional<Student> savedStudent = studentRepository.findById(student.getId());
        Assertions.assertThat(savedStudent).isPresent();
        Assertions.assertThat(savedStudent.get().getFirstName()).isEqualTo(student.getFirstName());
        Assertions.assertThat(savedStudent.get().getLastName()).isEqualTo(student.getLastName());
    }

    @Test
    void testListStudentsMethod() {
        studentService.saveStudent(student);
        Page<Student> students = studentService.listStudents(PageRequest.of(0, 5));
        Assertions.assertThat(students.getTotalElements()).isEqualTo(1L);
    }

    @Test
    void testGetStudentDetailMethod() {
        studentService.saveStudent(student);
        Optional<Student> studentOptional = studentService.getStudentDetail(student.getId());
        Assertions.assertThat(studentOptional).isPresent();
        Assertions.assertThat(studentOptional.get().getFirstName()).isEqualTo(Utilities.STUDENT_FIRST_NAME);
        Assertions.assertThat(studentOptional.get().getLastName()).isEqualTo(Utilities.STUDENT_LAST_NAME);
    }

    @Test
    void testEnrollStudentMethod() {
        courseRepository.save(course);
        studentService.saveStudent(student);

        Optional<Course> courseOptional = courseRepository.findById(course.getId());
        Optional<Student> studentOptional = studentService.getStudentDetail(student.getId());
        Assertions.assertThat(courseOptional).isPresent();
        Assertions.assertThat(studentOptional).isPresent();

        List<Course> courses = new ArrayList<>();
        courses.add(courseOptional.get());
        studentOptional.get().setCourses(courses);

        Student enrolledStudent = studentService.enrollStudent(studentOptional.get());
        Assertions.assertThat(enrolledStudent.getCourses().size()).isEqualTo(1);
    }
}
