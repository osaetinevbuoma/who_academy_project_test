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
import org.who.project.db.entity.Author;
import org.who.project.db.repository.AuthorRepository;
import org.who.project.service.AuthorService;

import java.util.Optional;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AuthorTestCases {
    @Autowired
    AuthorRepository authorRepository;

    @Autowired
    TestEntityManager testEntityManager;

    private Author author;
    private AuthorService authorService;
    private Utilities utilities;

    @BeforeEach
    void setUp() {
        authorService = new AuthorService(authorRepository);
        utilities = new Utilities(testEntityManager);

        author = new Author(Utilities.AUTHOR_NAME);
    }

    @AfterEach
    void destroy() {
        authorRepository.deleteAll();
    }

    @Test
    void testCreateAuthorMethod() {
        authorService.saveAuthor(author);

        Optional<Author> savedAuthor = authorRepository.findById(author.getId());
        Assertions.assertThat(savedAuthor).isPresent();
        Assertions.assertThat(savedAuthor.get().getName()).isEqualTo(author.getName());
    }

    @Test
    void testListAuthorsMethod() {
        authorService.saveAuthor(author);
        Page<Author> authors = authorService.listAuthors(PageRequest.of(0, 5));
        Assertions.assertThat(authors.getTotalElements()).isEqualTo(1L);
    }

    @Test
    void testGetAuthorDetailMethod() {
        authorService.saveAuthor(author);
        Optional<Author> authorOptional = authorService.getAuthorDetail(author.getId());
        Assertions.assertThat(authorOptional).isPresent();
        Assertions.assertThat(authorOptional.get().getName()).isEqualTo(Utilities.AUTHOR_NAME);
    }
}
