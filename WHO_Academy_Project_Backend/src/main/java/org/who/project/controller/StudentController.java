package org.who.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.who.project.db.entity.Course;
import org.who.project.db.entity.Student;
import org.who.project.service.CourseService;
import org.who.project.service.StudentService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    private final CourseService courseService;
    private final StudentService studentService;

    public StudentController(CourseService courseService, StudentService studentService) {
        this.courseService = courseService;
        this.studentService = studentService;
    }

    @GetMapping(value = "/students", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> listStudents(@RequestParam("page") Optional<Integer> page) {
        Map<String, Object> studentMap = new HashMap<>();

        int currentPage = page.orElse(1);
        int itemsPerPage = 5;

        Page<Student> students = studentService.listStudents(PageRequest.of(currentPage - 1,
                itemsPerPage));
        students.getContent().forEach(student -> student.setCourses(null));
        studentMap.put("students", students);

        int totalPages = students.getTotalPages();
        if (totalPages > 0) {
            List<Integer> pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList());
            studentMap.put("pageNumbers", pageNumbers);
        }

        return ResponseEntity.ok(studentMap);
    }

    @GetMapping(value = "/student/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getStudentDetail(@PathVariable("id") int id) {
        Optional<Student> student = studentService.getStudentDetail(id);
        if (!student.isPresent()) return ResponseEntity.notFound().build();

        student.get().getCourses().forEach(course -> {
            course.setAuthor(null);
            course.setStudents(null);
        });
        return ResponseEntity.ok(student.get());
    }

    @PostMapping(value = "/student", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Student createStudent(@RequestBody Student student) {
        student = studentService.saveStudent(student);
        return student;
    }

    @PutMapping(value = "/student/{id}", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Student updateStudent(@PathVariable("id") int id, @RequestBody Student student) {
        student = studentService.saveStudent(student);
        return student;
    }

    @PutMapping(value = "/enroll/{courseId}/{studentId}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> enrollStudent(@PathVariable("courseId") int courseId,
                                 @PathVariable("studentId") int studentId,
                                 @RequestBody Student student) {
        Student enrolledStudent = studentService.enrollStudent(student);
        enrolledStudent.setCourses(null);

        return ResponseEntity.ok(enrolledStudent);
    }
}
