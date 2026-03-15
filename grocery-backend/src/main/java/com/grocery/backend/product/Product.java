package com.grocery.backend.product;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // Top-level category (e.g. "Fresh Food")
    @Column(nullable = false)
    private String category;

    // Subcategory (e.g. "Fruits")
    @Column(nullable = false)
    private String subcategory;

    @Column(name = "unit_size", nullable = false)
    private BigDecimal unitSize;

    @Column(name = "unit_unit", nullable = false)
    private String unitUnit; // "G", "ML", "PCS"

//    @Column(name = "image_url")
//    private String imageUrl;

    public Product() {}

    public Product(String name, String category, String subcategory) {
        this.name = name;
        this.category = category;
        this.subcategory = subcategory;
        this.unitSize = BigDecimal.ONE;
        this.unitUnit = "PCS";
    }

    public Product(String name, String category, String subcategory, BigDecimal unitSize, String unitUnit) {
        this.name = name;
        this.category = category;
        this.subcategory = subcategory;
        this.unitSize = unitSize;
        this.unitUnit = unitUnit;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getSubcategory() { return subcategory; }
    public BigDecimal getUnitSize() { return unitSize; }
    public String getUnitUnit() { return unitUnit; }
//    public String getImageUrl() { return imageUrl; }
//    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    @Transient
    public String getImageUrl() {
        if (this.name == null) return null;

        String fileName = this.name
                .toLowerCase()
                .replace(" ", "-")
                .replace("&", "")
                .replace(",", "");

        return "https://smart-grocery-web.onrender.com/api/product-images/" + fileName + ".png";
    }


    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setSubcategory(String subcategory) { this.subcategory = subcategory; }
    public void setUnitSize(BigDecimal unitSize) { this.unitSize = unitSize; }
    public void setUnitUnit(String unitUnit) { this.unitUnit = unitUnit; }
}