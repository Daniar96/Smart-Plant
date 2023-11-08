package guru.springframework.spring6restmvc.controller;

import guru.springframework.spring6restmvc.services.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final TokenService tokenService;

    @PostMapping("/login")
    public String login(Authentication authentication){
        System.out.println("test " + authentication.getName());
        String token = tokenService.generateToken(authentication);
        System.out.println("Token: "+token);
        return token;
    }
}
