package com.fundpulse.app.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "investments")
public class Investment {

    @Id
    private String investmentId;

    private String proposalId; // Linked proposal
    private String investorId; // Investor making the investment
    private Long amount; // Amount invested
    private LocalDateTime investmentDate;
}
