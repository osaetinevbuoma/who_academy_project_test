package org.who.project.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.who.project.db.entity.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {
}
