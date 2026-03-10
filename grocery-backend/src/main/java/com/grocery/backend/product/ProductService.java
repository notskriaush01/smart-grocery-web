package com.grocery.backend.product;

import com.grocery.backend.price.Price;
import com.grocery.backend.price.PriceRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepo;
    private final PriceRepository priceRepo;

    public ProductService(ProductRepository productRepo, PriceRepository priceRepo) {
        this.productRepo = productRepo;
        this.priceRepo = priceRepo;
    }

    // ------------------------------------------------------------------ //
    //  Single product detail
    // ------------------------------------------------------------------ //

    public Optional<ProductDto> getById(Long id) {
        return productRepo.findById(id).map(product -> {
            List<Price> prices = priceRepo.findByProductIdOrderByPriceAsc(product.getId());
            return toDetailDTO(product, prices);
        });
    }

    // ------------------------------------------------------------------ //
    //  Paginated list by category (slug → DB name)
    // ------------------------------------------------------------------ //

    public Page<ProductDto> getByCategory(
            String categorySlug,
            String search,
            int page,
            int size,
            String sort
    ) {
        String categoryName = slugToCategory(categorySlug);

        // Build sort
        Sort jpaSort = switch (sort) {
            case "price_desc" -> Sort.by("name").descending(); // price sort handled after enrichment
            case "name_asc"   -> Sort.by("name").ascending();
            default           -> Sort.by("name").ascending();  // price_asc default
        };

        // Fetch products
        List<Product> products;
        if (categoryName == null || categoryName.isBlank()) {
            products = productRepo.findAll(Sort.by("name").ascending());
        } else if (search != null && !search.isBlank()) {
            products = productRepo.findByCategoryIgnoreCaseAndNameContainingIgnoreCase(
                    categoryName, search.trim());
        } else {
            products = productRepo.findByCategoryIgnoreCase(categoryName);
        }

        // Enrich with prices
        List<Long> ids = products.stream().map(Product::getId).toList();
        Map<Long, List<Price>> pricesByProduct = ids.isEmpty()
                ? Collections.emptyMap()
                : priceRepo.findAllByProductIdIn(ids)
                        .stream()
                        .collect(Collectors.groupingBy(p -> p.getProduct().getId()));

        List<ProductDto> dtos = products.stream()
                .map(p -> toListDTO(p, pricesByProduct.getOrDefault(p.getId(), List.of())))
                .collect(Collectors.toList());

        // Sort by price if requested (after enrichment since price lives in prices table)
        if ("price_asc".equals(sort)) {
            dtos.sort(Comparator.comparing(
                d -> d.lowestPrice != null ? d.lowestPrice : BigDecimal.valueOf(Long.MAX_VALUE)));
        } else if ("price_desc".equals(sort)) {
            dtos.sort(Comparator.comparing(
                (ProductDto d) -> d.lowestPrice != null ? d.lowestPrice : BigDecimal.ZERO
            ).reversed());
        }

        // Manual pagination
        int start = Math.min(page * size, dtos.size());
        int end   = Math.min(start + size, dtos.size());
        List<ProductDto> pageContent = dtos.subList(start, end);

        return new PageImpl<>(pageContent, PageRequest.of(page, size), dtos.size());
    }

    // ------------------------------------------------------------------ //
    //  Top deals — lowest absolute price across all products
    // ------------------------------------------------------------------ //

    public List<ProductDto> getTopDeals(int limit) {
        List<Object[]> rows = priceRepo.findTopDealProductIds();

        List<Long> topIds = rows.stream()
                .limit(limit)
                .map(r -> ((Number) r[0]).longValue())
                .toList();

        if (topIds.isEmpty()) return List.of();

        Map<Long, Product> productMap = productRepo.findAllById(topIds)
                .stream()
                .collect(Collectors.toMap(Product::getId, p -> p));

        Map<Long, List<Price>> priceMap = priceRepo.findAllByProductIdIn(topIds)
                .stream()
                .collect(Collectors.groupingBy(p -> p.getProduct().getId()));

        return topIds.stream()
                .map(id -> productMap.get(id))
                .filter(Objects::nonNull)
                .map(p -> toListDTO(p, priceMap.getOrDefault(p.getId(), List.of())))
                .toList();
    }

    // ------------------------------------------------------------------ //
    //  Search across all categories
    // ------------------------------------------------------------------ //

    public Page<ProductDto> search(String query, int page, int size) {
        List<Product> products = productRepo.findByNameContainingIgnoreCase(query.trim());

        List<Long> ids = products.stream().map(Product::getId).toList();
        Map<Long, List<Price>> priceMap = ids.isEmpty()
                ? Collections.emptyMap()
                : priceRepo.findAllByProductIdIn(ids)
                        .stream()
                        .collect(Collectors.groupingBy(p -> p.getProduct().getId()));

        List<ProductDto> dtos = products.stream()
                .map(p -> toListDTO(p, priceMap.getOrDefault(p.getId(), List.of())))
                .toList();

        int start = Math.min(page * size, dtos.size());
        int end   = Math.min(start + size, dtos.size());
        return new PageImpl<>(dtos.subList(start, end), PageRequest.of(page, size), dtos.size());
    }

    // ------------------------------------------------------------------ //
    //  DTO builders
    // ------------------------------------------------------------------ //

    /** Full DTO for detail view — includes storeListings */
    private ProductDto toDetailDTO(Product product, List<Price> prices) {
        ProductDto dto = toListDTO(product, prices);

        dto.storeListings = prices.stream().map(price -> {
            ProductDto.StoreListing sl = new ProductDto.StoreListing();
            sl.storeId   = price.getStore().getId();
            sl.storeName = price.getStore().getName();
            sl.storeLogo = null; // extend later
            sl.price     = price.getPrice();
            sl.unitPrice = computeUnitPrice(product, price.getPrice());
            return sl;
        }).toList();

        return dto;
    }

    /** Lightweight DTO for list/card views */
    private ProductDto toListDTO(Product product, List<Price> prices) {
        ProductDto dto = new ProductDto();
        dto.id          = product.getId();
        dto.name        = product.getName();
        dto.category    = product.getCategory();
        dto.categorySlug = categoryToSlug(product.getCategory());
        dto.subcategory = product.getSubcategory();
        dto.brand       = product.getSubcategory(); // stand-in until brand column added
        dto.description = product.getUnitSize() + " " + product.getUnitUnit().toLowerCase();
        dto.imageUrl = product.getImageUrl();

        dto.lowestPrice = prices.stream()
                .map(Price::getPrice)
                .min(Comparator.naturalOrder())
                .orElse(null);

        return dto;
    }

    /**
     * Compute price per 100g or 100ml.
     * Returns null for PCS (piece) units since per-unit doesn't make sense.
     */
    private BigDecimal computeUnitPrice(Product product, BigDecimal price) {
        if ("PCS".equalsIgnoreCase(product.getUnitUnit())) return null;
        if (product.getUnitSize() == null || product.getUnitSize().compareTo(BigDecimal.ZERO) == 0) return null;

        // price / unitSize * 100  → price per 100g or 100ml
        return price
                .divide(product.getUnitSize(), 6, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .setScale(2, RoundingMode.HALF_UP);
    }

    // ------------------------------------------------------------------ //
    //  Slug ↔ category name helpers
    // ------------------------------------------------------------------ //

    /**
     * Converts a URL slug to the exact DB category string.
     * e.g. "fresh-food" → "Fresh Food"
     * Falls back to null (meaning: all products) for unknown slugs.
     */
    public static String slugToCategory(String slug) {
        if (slug == null || slug.isBlank()) return null;
        return SLUG_TO_CATEGORY.getOrDefault(slug.toLowerCase(), null);
    }

    public static String categoryToSlug(String category) {
        if (category == null) return "";
        return category.toLowerCase().replace(" & ", "-").replace(" ", "-");
    }

    private static final Map<String, String> SLUG_TO_CATEGORY = Map.of(
        "fresh-food",         "Fresh Food",
        "bakery",             "Bakery",
        "dairy-eggs",         "Dairy & Eggs",
        "meat-seafood",       "Meat & Seafood",
        "frozen-food",        "Frozen Food",
        "pantry-items",       "Pantry Items",
        "snacks-beverages",   "Snacks & Beverages"
    );
}