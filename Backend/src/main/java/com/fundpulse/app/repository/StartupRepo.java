package com.fundpulse.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fundpulse.app.models.Startup;
import org.springframework.stereotype.Repository;

@Repository
public interface StartupRepo extends JpaRepository<Startup,Integer> {
}
