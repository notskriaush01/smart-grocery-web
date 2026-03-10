package com.grocery.backend.product;

import java.math.BigDecimal;
import java.util.List;

/**
 * The response shape that the Vue frontend consumes.
 *
 * ProductCard expects:  id, name, brand, category, imageUrl, lowestPrice, description
 * ProductDetailView expects the above plus: categorySlug, storeListings
 */
public class ProductDto {

    public Long id;
    public String name;

    /** We don't have a brand column yet — defaults to category name as a stand-in */
    public String brand;

    /** Human-readable category e.g. "Fresh Food" */
    public String category;

    /** URL-friendly slug e.g. "fresh-food" — used for breadcrumb links */
    public String categorySlug;

    public String subcategory;
    public String description;
    public String imageUrl;      // null until you add image support

    /** Lowest price across all stores */
    public BigDecimal lowestPrice;

    /** Per-store breakdown shown in "Where to buy" section */
    public List<StoreListing> storeListings;

    // ---- nested DTO ----
    public static class StoreListing {
        public Long storeId;
        public String storeName;
        public String storeLogo;   // null for now
        public BigDecimal price;

        /** Price per 100g/100ml — null for PCS unit */
        public BigDecimal unitPrice;
    }
}