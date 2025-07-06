package com.manjosh.labs.invoicegeneratorapi.domain.models;

import lombok.Data;

@Data
public class Account {
  private String accountName;
  private String accountNumber;
  private String ifscCode;
}
