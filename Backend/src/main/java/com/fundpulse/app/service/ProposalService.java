package com.fundpulse.app.service;

import com.fundpulse.app.forms.ProposalForm;
import com.fundpulse.app.models.Proposal;
import com.fundpulse.app.models.Startup;
import com.fundpulse.app.repository.ProposalRepo;
import com.fundpulse.app.repository.StartupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProposalService {

    @Autowired
    private StartupRepo startupRepo;

    @Autowired
    private ProposalRepo proposalRepo;

    public ResponseEntity<Proposal> addProposal(ProposalForm proposalForm, String id) {
        Optional<Startup> startupById = startupRepo.findById(Integer.valueOf(id));
        if (startupById.isPresent()) {
            Optional<Proposal> activeProposal = proposalRepo.findByStartupAndStatus()
            Startup startup = startupById.get();
            Proposal proposal = new Proposal();

            proposal.setStartUpId(startup.getStartupId());
            proposal.setAmount(proposalForm.getAmount());
            proposal.setEquity(proposalForm.getEquity());
            proposal.setReason(proposalForm.getReason());
            proposal.setLocation(proposalForm.getLocation());
            proposal.setSector(proposalForm.getSector());
            proposal.setStartDate(proposalForm.getStartDate());
            proposal.setEndDate(proposalForm.getEndDate());

            Proposal savedProposal = proposalRepo.save(proposal);
            startup.setProposalId(savedProposal.getProposalId());
             return ResponseEntity.ok().body(proposal);
        }else{
            System.out.println("user is not available");
            return ResponseEntity.notFound().build();
        }

    }
}
