package com.fundpulse.app.repository;

import com.fundpulse.app.models.Startup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StartupRepo extends JpaRepository<Startup, Integer> {
    Startup findByEmailAndPassword(String email, String pwd);
}
