package com.fundpulse.app.service.proposal;

import com.fundpulse.app.dto.ProposalForm;
import com.fundpulse.app.models.Proposal;
import com.fundpulse.app.models.Startup;
import com.fundpulse.app.repository.ProposalRepo;
import com.fundpulse.app.repository.StartupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;

import java.util.Optional;

@Service
public class ProposalService {

    @Autowired
    private StartupRepo startupRepo;

    @Autowired
    private ProposalRepo proposalRepo;

    public ResponseEntity<Proposal> addProposal(ProposalForm proposalForm, String id) {
        Optional<Startup> startupById = startupRepo.findById(id);

        if (startupById.isPresent()) {
            
            Startup startup = startupById.get();
            Proposal proposal = getProposal(proposalForm, startup);

            Proposal savedProposal = proposalRepo.save(proposal);
            System.out.println(savedProposal.getProposalId());
            startup.setProposalId(savedProposal.getProposalId());
            startupRepo.save(startup);
             return ResponseEntity.ok().body(proposal);
        }else{
            System.out.println("user is not available");
            return ResponseEntity.notFound().build();
        }

    }

    public ResponseEntity<List<Proposal>> getProposals(){

        Optional<List<Proposal>> proposals = proposalRepo.findByStatus(true);
        List<Proposal> proposals2 = proposals.get();
        System.out.println(proposals2);
        return ResponseEntity.ok().body(proposals2);

    }

    private static Proposal getProposal(ProposalForm proposalForm, Startup startup) {
        Proposal proposal = new Proposal();

        proposal.setStartUpId(startup.getStartupId());
        proposal.setAmount(proposalForm.getAmount());
        proposal.setEquity(proposalForm.getEquity());
        proposal.setReason(proposalForm.getReason());
        proposal.setLocation(proposalForm.getLocation());
        proposal.setSector(proposalForm.getSector());
        proposal.setStartDate(proposalForm.getStartDate());
        proposal.setEndDate(proposalForm.getEndDate());
        proposal.setStatus(true);
        return proposal;
    }

    // private boolean canSubmitProposal(String id){

    //     Optional<Proposal> activeProposal = proposalRepo.findByStartupAndStatus(id,"Active");
    //    
    //     return true;
   // }
}
