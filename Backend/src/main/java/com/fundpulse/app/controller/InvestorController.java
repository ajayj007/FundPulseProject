package com.fundpulse.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fundpulse.app.forms.InvestorForm;
import com.fundpulse.app.service.InvestorService;

@RestController
@RequestMapping("/api/investor")
public class InvestorController {

  @Autowired
  private InvestorService investorService;

  @PostMapping(value = "/signup", consumes = "multipart/form-data")
  public ResponseEntity<String> registerInvestor(@ModelAttribute InvestorForm investorForm) {
    return investorService.registerInvestor(investorForm);
  }

}
