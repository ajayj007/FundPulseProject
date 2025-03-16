package com.fundpulse.app.service;

import com.fundpulse.app.ResourseNotFoundExaception;
import com.fundpulse.app.forms.LoginRequest;
import com.fundpulse.app.forms.ProposalForm;
import com.fundpulse.app.forms.StartUpForm;
import com.fundpulse.app.models.Proposal;
import com.fundpulse.app.models.Startup;
import com.fundpulse.app.repository.ProposalRepo;
import com.fundpulse.app.repository.StartupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class StartupService {
    @Autowired
    private StartupRepo startupRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    private  Startup getStartup(StartUpForm startUpForm) {
        Startup startup = new Startup();
        startup.setFounderName(startUpForm.getFounderName());
        startup.setEmail(startUpForm.getEmail());
        startup.setPhone(startUpForm.getCountryCode() + " " + startUpForm.getPhone());
        startup.setPassword(encoder.encode(startUpForm.getPassword()));
        startup.setIndustryCategories(startUpForm.getIndustryCategories());
        startup.setFundingGoal(startUpForm.getCurrency() + " " + startUpForm.getFundingGoal());
        return startup;
    }

    public Startup loginStartup(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String pwd = loginRequest.getPassword();
        System.out.println(email + " " + pwd);
        Startup startup = startupRepo.findByEmailAndPassword(email, pwd);
        System.out.println(startup);
        if (startup == null) {

            throw new ResourseNotFoundExaception("Investor not found!");
        }

        return startup;
    }

    public ResponseEntity<String> registerStartup(StartUpForm startUpForm) {
        try {

            Startup startup = getStartup(startUpForm);

            startupRepo.save(startup);

            return ResponseEntity.ok("Startup registered successfully and verified.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing signup: " + e.getMessage());
        }
    }



}
