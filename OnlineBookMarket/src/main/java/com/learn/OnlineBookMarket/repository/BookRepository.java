package com.learn.OnlineBookMarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.OnlineBookMarket.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    
	@RestResource(path="categoryId")
	Page<Book> findByCategoryId(@Param("id") long id,Pageable pageable);
} 
