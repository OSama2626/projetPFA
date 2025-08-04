package ma.project.civ.config;

import lombok.AllArgsConstructor;
import ma.project.civ.config.filters.jwtAuthorizationFilter;
import ma.project.civ.config.filters.jwtAuthenticationFilter;
import ma.project.civ.entities.users.UserApp;
import ma.project.civ.services.UserAppService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.ArrayList;
import java.util.Collection;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class securityConfig {

    private final UserAppService userAppService;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authManager)
            throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()))
                .formLogin(withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/login", "/refreshToken/**", "/admin_etablissement/**").permitAll()
                        .anyRequest().authenticated())
                .addFilter(new jwtAuthenticationFilter(authManager))
                .addFilterBefore(new jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public UserDetailsService configure(AuthenticationManagerBuilder auth) throws Exception {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String matricule) throws UsernameNotFoundException {
                UserApp userApp = userAppService.getUserByMatricule(matricule)
                        .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé : " + matricule));
                Collection<GrantedAuthority> roles = new ArrayList<>();
                roles.add(new SimpleGrantedAuthority(userApp.getDiscriminatorValue()));
                return new User(userApp.getMatricule(), userApp.getPassword(), roles);
            }
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, UserDetailsService userDetailsService)
            throws Exception {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);

        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .authenticationProvider(provider)
                .build();
    }
}