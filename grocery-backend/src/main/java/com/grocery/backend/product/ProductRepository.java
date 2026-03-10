package com.grocery.backend.product;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryIgnoreCase(String category);

    List<Product> findByCategoryIgnoreCaseAndSubcategoryIgnoreCase(String category, String subcategory);

    List<Product> findByCategoryIgnoreCaseAndNameContainingIgnoreCase(String category, String name);

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findAll(Sort sort);
    Optional<Product> findFirstByNameIgnoreCase(String name);

    @Query("select distinct p.category from Product p order by p.category")
    List<String> findDistinctCategories();

    @Query("select distinct p.subcategory from Product p where lower(p.category) = lower(?1) order by p.subcategory")
    List<String> findDistinctSubcategoriesByCategory(String category);
}