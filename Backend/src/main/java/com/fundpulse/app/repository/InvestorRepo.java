package com.fundpulse.app.repository;

import com.fundpulse.app.models.Investor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvestorRepo extends JpaRepository<Investor, Integer> {
    Investor findByEmailAndPassword(String email, String pwd);
}
