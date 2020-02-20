package org.who.project;

import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.who.project.db.entity.Author;
import org.who.project.db.entity.Course;
import org.who.project.db.entity.Student;

public class Utilities {
    private final TestEntityManager testEntityManager;

    public static final String STUDENT_FIRST_NAME = "John";
    public static final String STUDENT_LAST_NAME = "Doe";
    public static final String AUTHOR_NAME = "Jane Doe";
    public static final String COURSE_NAME = "How to write a grant proposal";

    public Utilities(TestEntityManager testEntityManager) {
        this.testEntityManager = testEntityManager;
    }

    public void createStudent() {
        Student student = new Student(STUDENT_FIRST_NAME, STUDENT_LAST_NAME);
        testEntityManager.persist(student);
    }

    public void createAuthor() {
        Author author = new Author(AUTHOR_NAME);
        testEntityManager.persist(author);
    }

    public void createCourse() {
        Course course = new Course(COURSE_NAME);
        testEntityManager.persist(course);
    }
}
