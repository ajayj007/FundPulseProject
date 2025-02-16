package com.fundpulse.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fundpulse.app.models.Investor;
import org.springframework.stereotype.Repository;

@Repository
public interface InvestorRepo extends JpaRepository<Investor,Integer> {
}
