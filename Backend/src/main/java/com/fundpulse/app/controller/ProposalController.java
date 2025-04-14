package com.fundpulse.app.controller;

import com.fundpulse.app.models.Proposal;
import com.fundpulse.app.service.proposal.ProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProposalController {
    @Autowired
    private ProposalService proposalService;

    @GetMapping("/back-proposals")
    public ResponseEntity<List<Proposal>> getDisabledProposals(){
        return proposalService.getDisabledProposals();
    }

    @GetMapping("/active-proposals/{startupId}")
    public ResponseEntity<Proposal> getActiveProposals(@PathVariable String startupId){
        return proposalService.getActiveProposals( startupId);
    }

    @GetMapping("/proposals")
    public ResponseEntity<List<Proposal>> getAllActiveProposals(){
        return proposalService.getAllActiveProposals();
    }
}
