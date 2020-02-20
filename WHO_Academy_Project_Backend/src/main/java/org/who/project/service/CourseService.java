package org.who.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.who.project.db.entity.Course;
import org.who.project.db.repository.CourseRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    /**
     * List of course paginated.
     *
     * @param pageable  pageable object for pagination
     * @return          a Page object of Courses
     */
    public Page<Course> listCourses(Pageable pageable) {
        return courseRepository.findAll(pageable);
    }

    /**
     * List all courses.
     * @return
     */
    public List<Course> listCourses() {
        return courseRepository.findAll();
    }

    /**
     * Get a course's detail.
     *
     * @param id    id of the course to get.
     * @return      an Optional object of courses
     */
    public Optional<Course> getCourseDetail(int id) {
        return courseRepository.findById(id);
    }

    /**
     * Save a course object.
     * @param course    course entity to persist to DB
     * @return          a saved object
     */
    public Course saveCourse(Course course) {
        courseRepository.save(course);
        return course;
    }
}
