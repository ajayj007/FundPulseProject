package com.fundpulse.app.controller;

import com.fundpulse.app.forms.InvestorForm;
import com.fundpulse.app.service.GoogleDriveUploadService;
import com.fundpulse.app.service.InvestorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/drive")
public class GoogleDriveController {

    @Autowired
    private InvestorService investorService;

    @PostMapping(value = "/upload-pdf", consumes = "multipart/form-data")
    public ResponseEntity<String> registerInvestor(@ModelAttribute InvestorForm investorForm) {
        System.out.println("Received request in registerInvestor()");
        System.out.println("Investor Email: " + investorForm.getEmail());
        return investorService.registerInvestor(investorForm);
    }
}
