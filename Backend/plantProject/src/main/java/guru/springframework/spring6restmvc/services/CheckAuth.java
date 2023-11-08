package guru.springframework.spring6restmvc.services;

import guru.springframework.spring6restmvc.entities.User;
import guru.springframework.spring6restmvc.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class CheckAuth {

    private final UserRepository userRepository;


    public UUID authentication(Authentication authentication) {
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return authenticationForbasicLogin(userDetails);

        } else if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            return authenticationForOauth2(oauth2User);
        }
        else if (authentication.getPrincipal() instanceof Jwt) {
            // Assuming the principal is a Jwt object
            Jwt jwt = (Jwt) authentication.getPrincipal();
            return authenticationForJWTToken(jwt);
            // Extract user information from the JWT claims
        }

        //Default error UUID
        return UUID.fromString("a7355e4c-0000-0000-0000-ec00b8309ae9");
    }

    private UUID authenticationForJWTToken(Jwt jwtUser){
        String username = jwtUser.getClaimAsString("sub");

        User user =  userRepository.findByUsername(username);

        if (user != null) {
            return user.getUserId();
        }

        else {
            return UUID.fromString("a7355e4c-0000-0000-0000-ec00b8309ae9");
        }

    }
    private UUID authenticationForOauth2(OAuth2User oauth2User){
        String username = oauth2User.getAttribute("sub");
        String email = oauth2User.getAttribute("email");

        User user =  userRepository.findByUsername(username);

        if (user == null) {
            User newUser = User.builder()
                    .username(username)
                    .email(email)
                    .hashedpassword("GOOGLE")
                    .admin(Boolean.FALSE)
                    .build();
            User savedUser = userRepository.save(newUser);

            return savedUser.getUserId();
        }
        else {
            return user.getUserId();
        }
    }
    private UUID authenticationForbasicLogin(UserDetails userDetails){
        String username = userDetails.getUsername();

        User user =  userRepository.findByUsername(username);

        if (user != null) {
            return user.getUserId();
        }

        else return UUID.fromString("a7355e4c-0000-0000-0000-ec00b8309ae9");
    }

    public Optional<User> authenticationForUser(Authentication authentication) {
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return authenticationbasicLoginReturnUser(userDetails);

        } else if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            return authenticationForOauth2ReturnUser(oauth2User);
        }
        else if (authentication.getPrincipal() instanceof Jwt) {
            // Assuming the principal is a Jwt object
            Jwt jwt = (Jwt) authentication.getPrincipal();
            return authenticationForJWTTokenReturnUser(jwt);
            // Extract user information from the JWT claims
        }
        //Default error UUID
        return null;
    }

    private Optional<User> authenticationForJWTTokenReturnUser(Jwt jwtUser){
        String username = jwtUser.getClaimAsString("sub");

        User user =  userRepository.findByUsername(username);

        if (user != null) {
            return Optional.of(user);
        }

        else {
            return Optional.empty();
        }

    }

    private Optional<User> authenticationForOauth2ReturnUser(OAuth2User oauth2User){
        String username = oauth2User.getAttribute("sub");
        String email = oauth2User.getAttribute("email");

        User user =  userRepository.findByUsername(username);

        if (user == null) {
            User newUser = User.builder()
                    .username(username)
                    .email(email)
                    .hashedpassword("GOOGLE")
                    .admin(Boolean.FALSE)
                    .build();
            User savedUser = userRepository.save(newUser);

            return Optional.of(savedUser);
        }
        else {
            return Optional.of(user);
        }
    }
    private Optional<User> authenticationbasicLoginReturnUser(UserDetails userDetails){
        String username = userDetails.getUsername();

        User user =  userRepository.findByUsername(username);

        if (user != null) {
            return Optional.of(user);
        }

        else {
            return Optional.empty();
        }
    }


}
