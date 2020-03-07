package com.learn.OnlineBookMarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.learn.OnlineBookMarket.entity.BookCategory;

@RepositoryRestResource(collectionResourceRel="bookcategory", path="book-category")
public interface BookCategoryRepository extends JpaRepository<BookCategory,Long>{

}
