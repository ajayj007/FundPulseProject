package com.fundpulse.app.controller;

import com.fundpulse.app.forms.LoginRequest;
import com.fundpulse.app.forms.ProposalForm;
import com.fundpulse.app.forms.StartUpForm;
import com.fundpulse.app.models.Startup;
import com.fundpulse.app.service.ProposalService;
import com.fundpulse.app.service.StartupService;
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
    public ResponseEntity<String> registerInvestor(@RequestBody StartUpForm startUpForm) {
        System.out.println("Received request in registerInvestor()");
        System.out.println("Investor Email: " + startUpForm.getEmail());
        return startupService.registerStartup(startUpForm);
    }

    @PostMapping("/login")
    public Startup LoginInvestor(@RequestBody LoginRequest loginRequest) {

        Startup startup = startupService.loginStartup(loginRequest);
        return startup;

    }

    @PostMapping("/add-proposal/{id}")
    public ResponseEntity<?> addProposal(@ModelAttribute ProposalForm proposalForm,
                                         @PathVariable String id) {
        return proposalService.addProposal(proposalForm, id);
    }

}
