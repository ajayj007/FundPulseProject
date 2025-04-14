package com.fundpulse.app.controller;

import com.fundpulse.app.dto.LoginRequest;
import com.fundpulse.app.dto.ProposalForm;
import com.fundpulse.app.dto.StartUpForm;
import com.fundpulse.app.models.Startup;
import com.fundpulse.app.service.proposal.ProposalService;
import com.fundpulse.app.service.startup.StartupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/startup")
public class StartupController {

    @Autowired
    private StartupService startupService;

    @Autowired
    private ProposalService proposalService;

    @PostMapping(value = "/signup")
    public ResponseEntity<String> registerSignup(@RequestBody StartUpForm startUpForm) {
        System.out.println("Received request in registerSignup()");
        System.out.println("Signup Email: " + startUpForm.getEmail());
        return startupService.registerStartup(startUpForm);
    }

    @PostMapping("/login")
    public Startup LoginInvestor(@RequestBody LoginRequest loginRequest) {

        Startup startup = startupService.loginStartup(loginRequest);
        return startup;

    }

    @PostMapping("/add-proposal/{id}")
    public ResponseEntity<?> addProposal(@RequestBody ProposalForm proposalForm,
                                         @PathVariable String id) {
        return proposalService.addProposal(proposalForm, id);
    }

}
