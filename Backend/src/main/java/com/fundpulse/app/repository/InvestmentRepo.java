package com.fundpulse.app.repository;

import com.fundpulse.app.models.Investment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface InvestmentRepo extends MongoRepository<Investment, String> {
    
    List<Investment> findByProposalId(String proposalId);

    List<Investment> findByInvestorId(String investorId);
}
