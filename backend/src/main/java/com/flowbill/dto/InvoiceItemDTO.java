package com.flowbill.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class InvoiceItemDTO {
    private String description;
    private Integer quantity;
    private BigDecimal rate;
}