package com.fundpulse.app.repository;

import com.fundpulse.app.models.Investor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvestorRepo extends MongoRepository<Investor, Integer> {
    Investor findByEmailAndPassword(String email, String pwd);

    Optional<Investor> findByEmail(String email);
}
