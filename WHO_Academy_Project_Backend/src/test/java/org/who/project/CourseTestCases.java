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
import org.who.project.db.repository.CourseRepository;
import org.who.project.service.CourseService;

import java.util.Optional;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CourseTestCases {
    @Autowired
    CourseRepository courseRepository;

    @Autowired
    TestEntityManager testEntityManager;

    private Course course;
    private CourseService courseService;
    private Utilities utilities;

    @BeforeEach
    void setUp() {
        courseService = new CourseService(courseRepository);
        utilities = new Utilities(testEntityManager);

        course = new Course(Utilities.COURSE_NAME);
    }

    @AfterEach
    void destroy() {
        courseRepository.deleteAll();
    }

    @Test
    void testCreateCourseMethod() {
        courseService.saveCourse(course);

        Optional<Course> savedCourse = courseRepository.findById(course.getId());
        Assertions.assertThat(savedCourse).isPresent();
        Assertions.assertThat(savedCourse.get().getName()).isEqualTo(course.getName());
    }

    @Test
    void testListCoursesMethod() {
        courseService.saveCourse(course);
        Page<Course> courses = courseService.listCourses(PageRequest.of(0, 5));
        Assertions.assertThat(courses.getTotalElements()).isEqualTo(1L);
    }

    @Test
    void testGetCourseDetailMethod() {
        courseService.saveCourse(course);
        Optional<Course> courseOptional = courseService.getCourseDetail(course.getId());
        Assertions.assertThat(courseOptional).isPresent();
        Assertions.assertThat(courseOptional.get().getName()).isEqualTo(Utilities.COURSE_NAME);
    }
}
