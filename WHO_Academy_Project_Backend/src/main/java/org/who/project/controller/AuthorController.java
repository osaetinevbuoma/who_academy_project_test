package org.who.project.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.who.project.db.entity.Author;
import org.who.project.service.AuthorService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthorController {
    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping(value = "/authors", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> listAuthors(@RequestParam("page") Optional<Integer> page) {
        Map<String, Object> authorMap = new HashMap<>();

        int currentPage = page.orElse(1);
        int itemsPerPage = 5;

        Page<Author> authors = authorService.listAuthors(PageRequest.of(currentPage - 1,
                itemsPerPage));
        authors.getContent().forEach(author -> author.setCourses(null));
        authorMap.put("authors", authors);

        int totalPages = authors.getTotalPages();
        if (totalPages > 0) {
            List<Integer> pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList());
            authorMap.put("pageNumbers", pageNumbers);
        }

        return ResponseEntity.ok(authorMap);
    }

    @GetMapping(value = "/list-all-authors", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Author> listAllAuthors() {
        List<Author> authors = authorService.listAllAuthors();
        authors.forEach(author -> author.setCourses(null));
        return authors;
    }

    @GetMapping(value = "/author/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAuthorDetail(@PathVariable("id") int id) {
        Optional<Author> author = authorService.getAuthorDetail(id);
        if (!author.isPresent()) return ResponseEntity.notFound().build();

        author.get().getCourses().forEach(course -> {
            course.setStudents(null);
            course.setAuthor(null);
        });
        return ResponseEntity.ok(author.get());
    }

    @PostMapping(value = "/author", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Author createAuthor(@RequestBody Author author) {
        author = authorService.saveAuthor(author);
        return author;
    }

    @PutMapping(value = "/author/{id}", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Author updateAuthor(@PathVariable("id")int id, @RequestBody Author author) {
        author = authorService.saveAuthor(author);
        return author;
    }
}
