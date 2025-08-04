package ma.project.civ.config.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

public class jwtAuthorizationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(request.getServletPath().equals("/refreshToken")){
            filterChain.doFilter(request, response);
        }
        else {
            String authHeader = request.getHeader(JwtUtil.HEADER_STRING);
            if (authHeader != null && authHeader.startsWith(JwtUtil.TOKEN_PREFIX)) {
                try {
                    authHeader = authHeader.substring(JwtUtil.TOKEN_PREFIX.length());
                    Algorithm algorithm = Algorithm.HMAC256(JwtUtil.SECRET);
                    JWTVerifier jwtVerifier= JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = jwtVerifier.verify(authHeader);
                    String matricule=decodedJWT.getSubject();
                    String[] role= decodedJWT.getClaim("roles").asArray(String.class);
                    Collection<GrantedAuthority> authorities=new ArrayList<>();
                    for (String roleName:role) {
                        authorities.add(new SimpleGrantedAuthority(roleName));
                    }
                    UsernamePasswordAuthenticationToken authenticationToken=
                            new UsernamePasswordAuthenticationToken(matricule,null,authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                } catch (JWTVerificationException e) {
                    // Invalid token
                    response.setHeader("error-message", e.getMessage());
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                    return; // Stop filter chain execution
                }
            }
            filterChain.doFilter(request, response);
        }
    }
}
