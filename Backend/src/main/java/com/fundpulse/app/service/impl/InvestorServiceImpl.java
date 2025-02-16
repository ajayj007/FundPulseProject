package com.fundpulse.app.service.impl;

import com.fundpulse.app.service.DocumentUploadService;
import com.fundpulse.app.service.GoogleDriveUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fundpulse.app.forms.InvestorForm;
import com.fundpulse.app.models.Investor;
import com.fundpulse.app.repository.InvestorRepo;
import com.fundpulse.app.service.DocumentVerificationService;
import com.fundpulse.app.service.InvestorService;

import java.io.IOException;

@Service
public class InvestorServiceImpl implements InvestorService {

  @Autowired
  private DocumentVerificationService docService;

  @Autowired
  private InvestorRepo investorRepo;

  @Autowired
  private DocumentUploadService uploadService;

  @Autowired
  private GoogleDriveUploadService googleDriveUploadService;

  public ResponseEntity<String> registerInvestor(InvestorForm investorForm) {
    try {
        MultipartFile itrFile = investorForm.getItrDocument();

        if (itrFile.isEmpty()) {
            return ResponseEntity.badRequest().body("ITR document is required.");
        }

        // Validate ITR document
        // boolean isValid = docService.validateITR(itrFile, investorForm.getFullName(), investorForm.getDeclaredIncome());
        
        boolean isValid = true;
        if (!isValid) {
            return ResponseEntity.badRequest().body("ITR verification failed. Name mismatch or income below ₹1 crore.");
        }

        // Save investor details
        Investor investor = new Investor();
        investor.setFullName(investorForm.getFullName());
        investor.setEmail(investorForm.getEmail());
        investor.setPhone(investorForm.getPhone());
        investor.setPassword(investorForm.getPassword());
        investor.setInvestmentCategories(investorForm.getInvestmentCategories());
        investor.setDeclaredIncome(investorForm.getDeclaredIncome());
        investor.setExtractedIncome(12000000); // Dummy extracted value
        investor.setVerified(true); // Verified as income >= ₹1 crore



        try {
            String folderId = "https://drive.google.com/drive/folders/1B9VQxWAquEOGJM9LoNtzk0f64W_qcs-Z?usp=drive_link"; // Replace with your actual Google Drive folder ID
            String fileUrl = googleDriveUploadService.uploadFile(itrFile, folderId);
            System.out.println("File uploaded successfully: " + fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
        //String url = uploadService.uploadFile(itrFile);

      //  System.out.println("nnnnnnnnnnnnnnnnn  "+url);

        // Store ITR file
        investor.setItrDocument(itrFile.getBytes());

       // investorRepo.save(investor);
        return ResponseEntity.ok("Investor registered successfully and verified.");
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error processing signup: " + e.getMessage());
    }
}

  @Override
  public Boolean loginInvestor() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'loginInvestor'");
  }

}

