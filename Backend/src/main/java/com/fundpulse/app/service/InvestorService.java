package com.fundpulse.app.service;

import org.springframework.http.ResponseEntity;

import com.fundpulse.app.forms.InvestorForm;

public interface InvestorService {

    public ResponseEntity<String> registerInvestor(InvestorForm investorForm);

    public Boolean loginInvestor();

}