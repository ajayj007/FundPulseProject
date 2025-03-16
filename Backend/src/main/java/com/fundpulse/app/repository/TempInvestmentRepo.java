package com.fundpulse.app.repository;

import com.fundpulse.app.models.Investment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TempInvestmentRepo extends MongoRepository<Investment, String> {
    
    List<Investment> findByProposalId(String proposalId);
}
