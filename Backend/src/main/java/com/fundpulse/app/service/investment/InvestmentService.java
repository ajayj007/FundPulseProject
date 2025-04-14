package com.fundpulse.app.service.investment;

import com.fundpulse.app.dto.InvestmentForm;
import com.fundpulse.app.models.Investment;
import com.fundpulse.app.models.Proposal;
import com.fundpulse.app.repository.InvestmentRepo;
import com.fundpulse.app.repository.ProposalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class InvestmentService {

    @Autowired
    private InvestmentRepo investmentRepo;

    @Autowired
    private ProposalRepo proposalRepo;

    public ResponseEntity<?> makeInvestment(InvestmentForm investmentForm) {
        try {
            Investment investment = new Investment();
            investment.setInvestorId(investmentForm.getInvestorId());
            investment.setProposalId(investmentForm.getProposalId());
            investment.setAmount(investmentForm.getAmount());
            investment.setInvestmentDate(LocalDateTime.now()); // Set current date

            // Save the investment
            Investment savedInvestment = investmentRepo.save(investment);

            // Update the proposal's raised amount
            Proposal proposal = proposalRepo.findById(investmentForm.getProposalId())
                    .orElseThrow(() -> new RuntimeException("Proposal not found"));

            proposal.setRaisedAmount(proposal.getRaisedAmount() + investmentForm.getAmount());
            proposalRepo.save(proposal);

            return ResponseEntity.ok(savedInvestment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error making investment: " + e.getMessage());
        }
    }
    public ResponseEntity<?> getInvestments(String investorId) {
        try {
            // 1. Get all investments for the investor
            List<Investment> investments = investmentRepo.findByInvestorId(investorId);

            if (investments.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No investments found for investor ID: " + investorId);
            }

            // 2. Create a list to hold the enriched investment data
            List<Map<String, Object>> investmentData = new ArrayList<>();

            // 3. For each investment, get the proposal details and format the response
            for (Investment investment : investments) {
                Proposal proposal = proposalRepo.findById(investment.getProposalId())
                        .orElseThrow(() -> new RuntimeException(
                                "Proposal not found for ID: " + investment.getProposalId()
                        ));

                // Calculate equity percentage (investment amount / total amount to raise * equity offered)
                double equityPercentage = ((double)investment.getAmount() / (double)proposal.getAmountToRaise()) * (double) proposal.getEquityPercentage();

                System.out.println(investment.getAmount() );
                System.out.println(proposal.getAmountToRaise() );
                System.out.println(proposal.getEquityPercentage());
                System.out.println(equityPercentage);

                Map<String, Object> investmentDetails = new HashMap<>();
                investmentDetails.put("investmentId", investment.getInvestmentId());
                investmentDetails.put("projectName", proposal.getProjectName());
                investmentDetails.put("projectDescription", proposal.getReason());
                investmentDetails.put("projectSector", proposal.getSector());
                investmentDetails.put("totalInvested", investment.getAmount());
                investmentDetails.put("equityPercentage", equityPercentage);

                investmentDetails.put("investmentDate", investment.getInvestmentDate());

                investmentData.add(investmentDetails);
            }

            return ResponseEntity.ok(investmentData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching investments: " + e.getMessage());
        }
    }

    public ResponseEntity<?> getAllInvested(String investorId) {
        List<Investment> investments = investmentRepo.findByInvestorId(investorId);
        if (investments.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No investments found for investor ID: " + investorId);
        }
        Long total = 0L;
        Long count = 0L;
        for (Investment investment : investments) {
            total += investment.getAmount();
            count+=1;
        }
        Map<String,Long> map = new HashMap<>();
        map.put("totalInvested",total);
        map.put("activeInvestments",count);
        return ResponseEntity.ok().body(map);
    }
}
