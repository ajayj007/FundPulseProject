package com.fundpulse.app.service.startup;

import com.fundpulse.app.ResourseNotFoundExaception;
import com.fundpulse.app.dto.LoginRequest;
import com.fundpulse.app.dto.StartUpForm;
import com.fundpulse.app.models.Startup;
import com.fundpulse.app.repository.StartupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StartupService {

    @Autowired
    private StartupRepo startupRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    private Startup getStartup(StartUpForm startUpForm) {
        Startup startup = new Startup();
        startup.setFounderName(startUpForm.getFounderName());
        startup.setEmail(startUpForm.getEmail());
        startup.setPhone(startUpForm.getCountryCode() + " " + startUpForm.getPhone());
        startup.setPassword(encoder.encode(startUpForm.getPassword())); // ✅ Encrypt password before saving
        startup.setIndustryCategories(startUpForm.getIndustryCategories());
        startup.setFundingGoal(startUpForm.getCurrency() + " " + startUpForm.getFundingGoal());
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

    public Startup loginStartup(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String rawPassword = loginRequest.getPassword(); // User's input password

        System.out.println(email + " " + rawPassword);

        Startup startup = startupRepo.findByEmail(email)
                .orElseThrow(() -> new ResourseNotFoundExaception("Startup not found!"));

        // ✅ Compare raw password with stored hashed password using BCrypt
        if (!encoder.matches(rawPassword, startup.getPassword())) {
            throw new ResourseNotFoundExaception("Invalid credentials!");
        }

        return startup;
    }
}
