package com.grocery.backend.price;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface PriceRepository extends JpaRepository<Price, Long> {

    @Query("select max(p.date) from Price p")
    LocalDate findLatestDate();

    List<Price> findByDateAndProduct_IdIn(LocalDate date, Collection<Long> productIds);

    /** Latest price per store for one product, cheapest first. */
    @Query("""
        SELECT p FROM Price p JOIN FETCH p.store
        WHERE p.product.id = :productId
        AND p.date = (SELECT MAX(p2.date) FROM Price p2 WHERE p2.product.id = :productId)
        ORDER BY p.price ASC
    """)
    List<Price> findByProductIdOrderByPriceAsc(@Param("productId") Long productId);

    /** Latest price per store for a set of products. */
    @Query("""
        SELECT p FROM Price p JOIN FETCH p.store
        WHERE p.product.id IN :productIds
        AND p.date = (SELECT MAX(p2.date) FROM Price p2 WHERE p2.product.id = p.product.id)
    """)
    List<Price> findAllByProductIdIn(@Param("productIds") List<Long> productIds);

    /**
     * Returns [productId, minPrice] pairs ordered by minPrice ASC.
     * Used by getTopDeals() to find the cheapest products across all stores.
     */
    @Query("""
        SELECT p.product.id, MIN(p.price) as minPrice
        FROM Price p
        GROUP BY p.product.id
        ORDER BY minPrice ASC
    """)
    List<Object[]> findTopDealProductIds();
}