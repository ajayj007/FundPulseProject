package com.fundpulse.app.service;

import com.fundpulse.app.repository.InvestorRepo;
import com.fundpulse.app.repository.StartupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomInvestorDetailsService implements UserDetailsService {
    @Autowired
    private InvestorRepo investorRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        return investorRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + email));
    }
}
