package com.fundpulse.app.service;

import com.fundpulse.app.ResourseNotFoundExaception;
import com.fundpulse.app.forms.LoginRequest;
import com.fundpulse.app.forms.StartUpForm;
import com.fundpulse.app.models.Startup;
import com.fundpulse.app.repository.StartupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class StartupService {
    @Autowired
    private StartupRepo startupRepo;

    private static Startup getStartup(StartUpForm startUpForm) {
        Startup startup = new Startup();
        startup.setFounderName(startUpForm.getFounderName());
        startup.setEmail(startUpForm.getEmail());
        startup.setPhone(startUpForm.getCountryCode() + " " + startUpForm.getPhone());
        startup.setPassword(startUpForm.getPassword());
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
