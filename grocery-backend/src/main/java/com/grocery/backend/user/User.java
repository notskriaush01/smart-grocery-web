package com.grocery.backend.user;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    // We store HASH, not the raw password
    @Column(nullable = false, name = "password_hash")
    private String passwordHash;

    // Basket as JSON (TEXT) to keep it simple for our project
    @Column(columnDefinition = "TEXT", name = "basket_json")
    private String basketJson;

    @Column(columnDefinition = "TEXT", name = "shopping_lists_json")
    private String shoppingListsJson = "[]";

    public User() {}

    public User(String username, String email, String passwordHash) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.basketJson = "[]";
    }

    public String getShoppingListsJson() { return shoppingListsJson; }
    public void setShoppingListsJson(String shoppingListsJson) { this.shoppingListsJson = shoppingListsJson; }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPasswordHash() { return passwordHash; }
    public String getBasketJson() { return basketJson; }

    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public void setBasketJson(String basketJson) { this.basketJson = basketJson; }
}