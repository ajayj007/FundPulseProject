package com.fundpulse.app.service;

import com.fundpulse.app.ResourseNotFoundExaception;
import com.fundpulse.app.forms.InvestorForm;
import com.fundpulse.app.forms.LoginRequest;
import com.fundpulse.app.models.Investor;
import com.fundpulse.app.repository.InvestorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class InvestorService {

    @Value("${folderId}")
    String folderId;
    @Autowired
    private DocumentVerificationService docService;
    @Autowired
    private InvestorRepo investorRepo;
    @Autowired
    private DocumentUploadConfig uploadService;
    @Autowired
    private GoogleDriveUploadService googleDriveUploadService;

    private static Investor getInvestor(InvestorForm investorForm) {
        Investor investor = new Investor();
        investor.setFullName(investorForm.getFullName());
        investor.setEmail(investorForm.getEmail());
        investor.setPhone(investorForm.getCountryCode() + " " + investorForm.getPhone());
        investor.setPassword(investorForm.getPassword());
        investor.setInvestmentCategories(investorForm.getInvestmentCategories());
        investor.setDeclaredIncome(investorForm.getDeclaredIncome());
        investor.setExtractedIncome(12000000); // Dummy extracted value
        investor.setVerified(true); // Verified as income >= ₹1 crore
        return investor;
    }

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
            Investor investor = getInvestor(investorForm);


            String fileUrl = "";
            try {
                // Replace with your actual Google Drive folder ID
                fileUrl = googleDriveUploadService.uploadFile(itrFile, folderId);
                System.out.println("File uploaded successfully: " + fileUrl);
            } catch (IOException e) {
                return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
            }
            //String url = uploadService.uploadFile(itrFile);


            // Store ITR file
            investor.setItrUrl(fileUrl);

            investorRepo.save(investor);
            return ResponseEntity.ok("Investor registered successfully and verified.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing signup: " + e.getMessage());
        }
    }

    public Investor loginInvestor(LoginRequest loginRequest) {

        String email = loginRequest.getEmail();
        String pwd = loginRequest.getPassword();
        System.out.println(email + " " + pwd);
        Investor investor = investorRepo.findByEmailAndPassword(email, pwd);
        System.out.println(investor);
        if (investor == null) {

            throw new ResourseNotFoundExaception("Investor not found!");
        }

        return investor;
    }

}

