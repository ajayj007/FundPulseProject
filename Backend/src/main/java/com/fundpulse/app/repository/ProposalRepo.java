package com.fundpulse.app.repository;

import com.fundpulse.app.models.Proposal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProposalRepo extends MongoRepository<Proposal,String> {
    Optional<List<Proposal>> findByStatus(Boolean active);

    Optional<List<Proposal>> findByStatusAndStartUpId(boolean b, String startupId);
}
