package com.fundpulse.app.forms;

import org.springframework.web.multipart.MultipartFile;

import lombok.*;

//@Getter
//@Setter
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InvestorForm {
    private String fullName;
    private String email;
    private String phone;
    private String password;
    private String confirmPassword;
    private String investmentCategories;
    private double declaredIncome;

    private MultipartFile itrDocument;

}
