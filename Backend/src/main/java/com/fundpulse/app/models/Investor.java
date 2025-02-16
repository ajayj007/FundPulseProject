package com.fundpulse.app.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "investors")
public class Investor {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String fullName;
  private String email;
  private String phone;
  private String password;
  private String investmentCategories;
  private double declaredIncome; // From user input
  private double extractedIncome; // Extracted from ITR
  private boolean verified; // True if the document passes verification

  @Lob
  private byte[] itrDocument; // Storing the document as a byte array

}
