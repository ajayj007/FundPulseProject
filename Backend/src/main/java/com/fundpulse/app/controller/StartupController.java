package com.fundpulse.app.controller;

import com.fundpulse.app.forms.LoginRequest;
import com.fundpulse.app.forms.StartUpForm;
import com.fundpulse.app.models.Startup;
import com.fundpulse.app.service.StartupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/startup")
public class StartupController {

    @Autowired
    private StartupService startupService;

    @PostMapping(value = "/signup", consumes = "multipart/form-data")
    public ResponseEntity<String> registerInvestor(@ModelAttribute StartUpForm startUpForm) {
        System.out.println("Received request in registerInvestor()");
        System.out.println("Investor Email: " + startUpForm.getEmail());
        return startupService.registerStartup(startUpForm);
    }

    @PostMapping("/login")
    public Startup LoginInvestor(@RequestBody LoginRequest loginRequest) {

        Startup startup = startupService.loginStartup(loginRequest);
        return startup;

    }
}
