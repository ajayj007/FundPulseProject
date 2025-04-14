package com.fundpulse.app.controller;

import com.fundpulse.app.dto.InvestmentForm;
import com.fundpulse.app.service.investment.InvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/investment")
public class InvestmentController {
    @Autowired
private InvestmentService investmentService;

    @PostMapping("/invest")
    public ResponseEntity<?> makeInvestment(
           @RequestBody InvestmentForm investmentForm){
        return investmentService.makeInvestment(investmentForm);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getInvestments(@RequestParam String investorId){
        return investmentService.getInvestments(investorId);
    }

    @GetMapping("/get-invested")
    public ResponseEntity<?> getTotalInvested(@RequestParam String investorId){
        return investmentService.getAllInvested(investorId);
    }
}
