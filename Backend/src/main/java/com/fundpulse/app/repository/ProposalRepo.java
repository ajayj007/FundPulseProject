package com.fundpulse.app.repository;

import com.fundpulse.app.models.Proposal;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProposalRepo extends MongoRepository<Proposal,String> {
}
