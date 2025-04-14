package com.fundpulse.app.controller;

import com.fundpulse.app.dto.LoginRequest;
import com.fundpulse.app.dto.InvestorForm;
import com.fundpulse.app.models.Investor;
import com.fundpulse.app.service.investor.InvestorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/investor")
public class InvestorController {

    @Autowired
    private InvestorService investorService;

    @PostMapping("/login")
    public ResponseEntity<?> loginInvestor(@RequestBody LoginRequest loginRequest) {
        // Validate input
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email and password are required.");
        }

        try {
            Investor investor = investorService.loginInvestor(loginRequest);
            if (investor != null) {
                return ResponseEntity.ok(investor); // Return investor data
            } else {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid email or password.");
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing your request.");
        }
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<?> registerInvestor(@ModelAttribute InvestorForm investorForm) {
        System.out.println("Received request in registerInvestor()");
        System.out.println("Investor Email: " + investorForm.getEmail());
        return investorService.registerInvestor(investorForm);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllInvestors(){
        return investorService.getInvestors();
    }
}