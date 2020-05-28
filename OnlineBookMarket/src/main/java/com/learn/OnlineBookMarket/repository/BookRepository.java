package com.learn.OnlineBookMarket.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import com.learn.OnlineBookMarket.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    
	@RestResource(path="categoryId")
	Page<Book> findByCategoryId(@Param("id") long id,Pageable pageable);
	
	@RestResource(path="searchBook")
	Page<Book> findByNameContaining(@Param("name") String name,Pageable pageable);
} 
