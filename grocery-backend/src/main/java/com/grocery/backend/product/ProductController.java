package com.grocery.backend.product;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
//@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository repo;
    private final ProductService productService;

    public ProductController(ProductRepository repo, ProductService productService) {
        this.repo = repo;
        this.productService = productService;
    }

    @GetMapping("/categories")
    public List<String> categories() {
        return List.of("Fresh Food","Bakery","Dairy & Eggs","Meat & Seafood","Frozen Food","Pantry Items","Snacks & Beverages");
    }

    @GetMapping("/subcategories")
    public List<String> subcategories(@RequestParam String category) {
        return switch (category) {
            case "Fresh Food"        -> List.of("Fruits", "Vegetables");
            case "Bakery"            -> List.of("Bread", "Pastries", "Cakes");
            case "Dairy & Eggs"      -> List.of("Milk", "Cheese", "Yoghurt", "Butter");
            case "Meat & Seafood"    -> List.of("Beef", "Pork", "Chicken", "Turkey", "Fish", "Cold Cuts");
            case "Frozen Food"       -> List.of("Frozen Meals", "Finger Foods", "Vegetables", "Ice Cream");
            case "Pantry Items"      -> List.of("Grains & Pasta", "Baking supplies", "Canned Food", "Sauces & Condiments", "Spices & Seasonings");
            case "Snacks & Beverages"-> List.of("Sweet snacks", "Salty snacks", "Hot drinks", "Cold drinks", "Water & Functional Drinks");
            default                  -> List.of();
        };
    }

    @GetMapping("/menu")
    public Map<String, List<String>> menu() {
        Map<String, List<String>> m = new LinkedHashMap<>();
        for (String cat : categories()) m.put(cat, subcategories(cat));
        return m;
    }

    // GET /products?category=fresh-food&page=0&size=12&sort=price_asc&search=milk
    @GetMapping
    public Page<ProductDto> getAll(
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "price_asc") String sort
    ) {
        return productService.getByCategory(category, search, page, size, sort);
    }

    // GET /products/top-deals?limit=8
    @GetMapping("/top-deals")
    public List<ProductDto> topDeals(@RequestParam(defaultValue = "8") int limit) {
        return productService.getTopDeals(limit);
    }

    // GET /products/search?q=banana&page=0&size=12
    @GetMapping("/search")
    public Page<ProductDto> search(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        return productService.search(q, page, size);
    }

    // GET /products/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable Long id) {
        return productService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}