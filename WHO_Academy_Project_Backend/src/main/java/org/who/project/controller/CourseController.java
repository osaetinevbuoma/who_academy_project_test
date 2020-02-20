package org.who.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.who.project.db.entity.Course;
import org.who.project.service.CourseService;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping(value = "/courses", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> listCourses(@RequestParam("page") Optional<Integer> page) {
        Map<String, Object> courseMap = new HashMap<>();

        int currentPage = page.orElse(1);
        int itemsPerPage = 5;

        Page<Course> courses = courseService.listCourses(PageRequest.of(currentPage - 1,
                itemsPerPage));
        courses.getContent().forEach(course -> {
            course.setAuthor(null);
            course.setStudents(null);
        });
        courseMap.put("courses", courses);

        int totalPages = courses.getTotalPages();
        if (totalPages > 0) {
            List<Integer> pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList());
            courseMap.put("pageNumbers", pageNumbers);
        }

        return ResponseEntity.ok(courseMap);
    }

    @GetMapping(value = "/list-all-courses", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Course> listAllCourses() {
        List<Course> courses = courseService.listCourses();
        courses.forEach(course -> {
            course.setStudents(null);
            course.setAuthor(null);
        });
        return courses;
    }

    @GetMapping(value = "/course/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCourseDetail(@PathVariable("id") int id) {
        Optional<Course> course = courseService.getCourseDetail(id);
        if (!course.isPresent()) return ResponseEntity.notFound().build();

        Map<String, Object> courseMap = new HashMap<>();
        courseMap.put("id", course.get().getId());
        courseMap.put("name", course.get().getName());
        courseMap.put("createdAt", course.get().getCreatedAt());
        courseMap.put("updatedAt", course.get().getUpdatedAt());

        Map<String, Object> authorMap = new HashMap<>();
        authorMap.put("id", course.get().getAuthor().getId());
        authorMap.put("name", course.get().getAuthor().getName());
        authorMap.put("createdAt", course.get().getAuthor().getCreatedAt());
        authorMap.put("updatedAt", course.get().getAuthor().getUpdatedAt());

        List<Map<String, Object>> authorCoursesList = new ArrayList<>();
        course.get().getAuthor().getCourses().forEach(authorCourse -> {
            Map<String, Object> authorCourseMap = new HashMap<>();
            authorCourseMap.put("id", authorCourse.getId());
            authorCourseMap.put("name", authorCourse.getName());
            authorCoursesList.add(authorCourseMap);
        });

        authorMap.put("courses", authorCoursesList);

        courseMap.put("author", authorMap);

        return ResponseEntity.ok(courseMap);
    }

    @PostMapping(value = "/course", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Course createCourse(@RequestBody Course course) {
        course = courseService.saveCourse(course);
        return course;
    }

    @PutMapping(value = "/course/{id}", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Course updateCourse(@PathVariable("id") int id, @RequestBody Course course) {
        course = courseService.saveCourse(course);
        return course;
    }
}
