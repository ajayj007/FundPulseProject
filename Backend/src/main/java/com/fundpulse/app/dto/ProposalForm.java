package com.fundpulse.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProposalForm {

    private Long amount;
    private String reason;
    private int equity;
    private String location;
    private String sector;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
