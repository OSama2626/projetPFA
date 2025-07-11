package ma.project.civ.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import ma.project.civ.config.filters.JwtUtil;
import ma.project.civ.entities.users.UserApp;
import ma.project.civ.services.AuthorizationService;
import ma.project.civ.services.UserAppService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@AllArgsConstructor
public class authController {
    private final UserAppService userAppService;
    private final AuthorizationService authorizationService;

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials,
//                                   HttpServletRequest request) {
//
//        String matricule = credentials.get("matricule");
//        String password = credentials.get("password");
//
//        // Appelle ton service pour charger l'utilisateur
//        Optional<UserApp> userOpt = userAppService.getUserByMatricule(matricule);
//
//        if (userOpt.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Matricule incorrect");
//        }
//
//        UserApp user = userOpt.get();
//
//        // Vérifie le mot de passe (tu devrais utiliser BCrypt dans un vrai cas)
//        if (!user.getPassword().equals(password)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mot de passe incorrect");
//        }
//
//        Algorithm algorithm = Algorithm.HMAC256(JwtUtil.SECRET);
//
//        String accessToken = JWT.create()
//                .withSubject(user.getMatricule())
//                .withExpiresAt(new Date(System.currentTimeMillis() + JwtUtil.EXPIRATION_ACCESS_TOKEN))
//                .withIssuer(request.getRequestURL().toString())
//                .withClaim("roles", Collections.singletonList(user.getDiscriminatorValue()))
//                .sign(algorithm);
//
//        String refreshToken = JWT.create()
//                .withSubject(user.getMatricule())
//                .withExpiresAt(new Date(System.currentTimeMillis() + JwtUtil.EXPIRATION_REFRESH_TOKEN))
//                .withIssuer(request.getRequestURL().toString())
//                .sign(algorithm);
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("access_token", accessToken);
//        response.put("refresh_token", refreshToken);
//        response.put("role", user.getDiscriminatorValue());
//
//        return ResponseEntity.ok(response);
//    }

    @GetMapping("/test")
    public ResponseEntity<String> test(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            if (authorizationService.isAdmin(authentication)) {
                return ResponseEntity.ok("test valide pour l'admine");
            } else if (authorizationService.isAdminEtablissement(authentication)){
                return ResponseEntity.ok("test valide pour l'admine d'etablissement");
            }else if (authorizationService.isInspection(authentication)) {
                return ResponseEntity.ok("test valide pour L'inspection");
            }else if (authorizationService.isKN1(authentication)) {
                return ResponseEntity.ok("test valide pour controleure KN1");
            }else if (authorizationService.isKN2(authentication)) {
                return ResponseEntity.ok("test valide pour controleure KN2");
            }else if (authorizationService.isKN3(authentication)) {
                return ResponseEntity.ok("test valide pour controleure KN3");
            }else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("test n'est pas valide pour cette utilisateur");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("vous n'êtes pas authentifié");
        }
    }

    @GetMapping(path = "/refreshToken")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws Exception{
        String authToken = request.getHeader(JwtUtil.HEADER_STRING);
        if (authToken != null && authToken.startsWith(JwtUtil.TOKEN_PREFIX)) {
            try {
                String jwt = authToken.substring(JwtUtil.TOKEN_PREFIX.length());
                Algorithm algorithm = Algorithm.HMAC256(JwtUtil.SECRET);
                JWTVerifier jwtVerifier= JWT.require(algorithm).build();
                DecodedJWT decodedJWT = jwtVerifier.verify(jwt);
                String matricule=decodedJWT.getSubject();
                UserApp user= userAppService.getUserByMatricule(matricule).get();
                List<String> authorities = new ArrayList<>();
                authorities.add(user.getDiscriminatorValue());
                String accesstoken = JWT.create()
                        .withSubject(user.getMatricule())
                        .withExpiresAt(new Date(System.currentTimeMillis() + JwtUtil.EXPIRATION_ACCESS_TOKEN))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", authorities)
                        .sign(algorithm);
                Map<String, String> tokenMap = new HashMap<>();
                tokenMap.put("access_token", accesstoken);
                tokenMap.put("refresh_token", jwt);
                response.setContentType("application/json");
                new ObjectMapper().writeValue(response.getOutputStream(), tokenMap);

            }catch (Exception e){
                response.setHeader("error-message",e.getMessage());
                response.sendError(HttpServletResponse.SC_FORBIDDEN);
            }
        }
        else{
            throw new Exception("Invalid token");
        }

    }
}
