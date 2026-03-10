package com.grocery.backend.user;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepo;
    private final ObjectMapper mapper = new ObjectMapper();

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // Basic user info (for profile page)
    @GetMapping("/{userId}")
    public UserInfo getUser(@PathVariable Long userId) {
        User u = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return new UserInfo(u.getId(), u.getUsername(), u.getEmail());
    }

    // Get basket — returns full product objects as stored
    @GetMapping("/{userId}/basket")
    public List<JsonNode> getBasket(@PathVariable Long userId) throws Exception {
        User u = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        String json = u.getBasketJson();
        if (json == null || json.isBlank()) json = "[]";
        return mapper.readValue(json, new TypeReference<List<JsonNode>>() {});
    }

    // Save basket — stores full product objects sent from frontend
    @PutMapping("/{userId}/basket")
    public void saveBasket(@PathVariable Long userId, @RequestBody BasketSaveRequest req) throws Exception {
        User u = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<JsonNode> items = (req == null || req.items() == null) ? List.of() : req.items();
        String json = mapper.writeValueAsString(items);
        u.setBasketJson(json);
        userRepo.save(u);
    }

    // --- DTOs ---
    public record UserInfo(Long id, String username, String email) {}
    public record BasketSaveRequest(List<JsonNode> items) {}

        // Get shopping lists
    @GetMapping("/{userId}/shopping-lists")
    public List<JsonNode> getShoppingLists(@PathVariable Long userId) throws Exception {
        User u = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        String json = u.getShoppingListsJson();
        if (json == null || json.isBlank()) json = "[]";
        return mapper.readValue(json, new TypeReference<List<JsonNode>>() {});
    }

    // Save all shopping lists (full replace)
    @PutMapping("/{userId}/shopping-lists")
    public void saveShoppingLists(@PathVariable Long userId, @RequestBody ShoppingListsSaveRequest req) throws Exception {
        User u = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<JsonNode> lists = (req == null || req.lists() == null) ? List.of() : req.lists();
        u.setShoppingListsJson(mapper.writeValueAsString(lists));
        userRepo.save(u);
    }

    public record ShoppingListsSaveRequest(List<JsonNode> lists) {}
}