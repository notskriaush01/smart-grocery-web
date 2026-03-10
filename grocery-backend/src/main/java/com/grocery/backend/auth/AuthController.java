package com.grocery.backend.auth;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")  
public class AuthController {

    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/register")
    public AuthService.AuthResponse register(@RequestBody AuthService.RegisterRequest req) {
        return auth.register(req);
    }

    @PostMapping("/login")
    public AuthService.AuthResponse login(@RequestBody AuthService.LoginRequest req) {
        return auth.login(req);
    }
}