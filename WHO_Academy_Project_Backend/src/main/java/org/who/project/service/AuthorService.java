package org.who.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.who.project.db.entity.Author;
import org.who.project.db.repository.AuthorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {
    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    /**
     * Get a paginated list of authors.
     *
     * @param pageable  pageable object for pagination
     * @return          a Page object of Authors
     */
    public Page<Author> listAuthors(Pageable pageable) {
        return authorRepository.findAll(pageable);
    }

    /**
     * List all authors
     * @return
     */
    public List<Author> listAllAuthors() {
        return authorRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    /**
     * Get an author's detail.
     *
     * @param id    id of the author.
     * @return      an Optional object of author
     */
    public Optional<Author> getAuthorDetail(int id) {
        return authorRepository.findById(id);
    }

    /**
     * Save an author object.
     * @param author    author entity to persist to DB
     * @return          a saved object
     */
    public Author saveAuthor(Author author) {
        authorRepository.save(author);
        return author;
    }
}
