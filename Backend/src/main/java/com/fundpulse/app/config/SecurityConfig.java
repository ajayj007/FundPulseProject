package com.fundpulse.app.config;

import com.fundpulse.app.service.CustomInvestorDetailsService;
import com.fundpulse.app.service.CustomStartupDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Autowired
    private CustomInvestorDetailsService investorDetailsService;

    @Autowired
    private CustomStartupDetailsService startupDetailsService;

//    @Autowired
//    private AuthenticationFailureHandler authenticationFailureHandler;
//
//
//
//    @Autowired
//    private CustomLogoutSuccessHandler logoutSuccessHandler;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.authorizeHttpRequests(authorize -> authorize

                        .anyRequest().permitAll())
                .formLogin(formLogin -> {
                    formLogin.loginPage("/startup/login")
                            .loginProcessingUrl("/startup/authenticate")
                            .defaultSuccessUrl("/startup/dashboard", true)
                            .usernameParameter("email")
                            .passwordParameter("password");

                    formLogin.loginPage("/investor/login")
                            .loginProcessingUrl("/investor/authenticate")
                            .defaultSuccessUrl("/investor/dashboard", true)
                            .usernameParameter("email")
                            .passwordParameter("password");
                })
                .csrf(AbstractHttpConfigurer::disable)
                // .oauth2Login(oauth -> oauth.loginPage("/login")
                //         .successHandler(oAuthAuthenticationSuccessHandler))
                // .logout(logout -> logout.logoutSuccessHandler(logoutSuccessHandler))
                .build();
    }

    @Bean
    public AuthenticationProvider investorAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(encoder);
        provider.setUserDetailsService(investorDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationProvider startupAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(encoder);
        provider.setUserDetailsService(startupDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
