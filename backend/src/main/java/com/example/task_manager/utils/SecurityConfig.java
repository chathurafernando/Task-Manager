
package com.example.task_manager.utils;

import com.example.task_manager.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;  // Add this import


@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    // Password encoder bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Authentication manager bean
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // Security filter chain configuration using lambda DSL syntax
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disabling CSRF as it's not required for stateless APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()  // Public routes
                .anyRequest().authenticated()                 // Protect everything else
            )
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Stateless session management
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)  // JWT filter

            // Enable CORS for all requests
            .cors(cors -> cors.configurationSource(corsConfigurationSource())); 

        return http.build();
    }

    // CORS configuration bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow specific origins
        config.addAllowedOrigin("http://localhost:4200");  

        // Allow specific HTTP methods (GET, POST, PUT, DELETE, PATCH, OPTIONS)
        config.setAllowedMethods(
            List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
        );

        // Allow specific headers
        config.addAllowedHeader("Authorization");  // Allows the Authorization header (for JWT token)
        config.addAllowedHeader("Content-Type");   // Allows the Content-Type header
         // Allows the Access-Control-Allow-Methods header

        // Allow credentials (cookies, authorization headers)
        config.setAllowCredentials(true);

        // Register the CORS configuration for all endpoints
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
