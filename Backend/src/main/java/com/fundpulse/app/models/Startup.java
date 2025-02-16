package com.fundpulse.app.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "startups")
public class Startup {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String founderName;
  private String email;
  private String phone;
  private String password;
  private String industryCategories;
  private double fundingGoal;
  
  private byte[] pitchVideo;
}
