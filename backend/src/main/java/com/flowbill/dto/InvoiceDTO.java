package com.flowbill.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class InvoiceDTO {
    private String clientName;
    private String clientEmail;
    private String clientAddress;

    private String invoiceNumber;
    private String date;      // ISO string
    private String dueDate;   // ISO string

    private BigDecimal tax;
    private BigDecimal discount;
    private String notes;

    private List<InvoiceItemDTO> items;
}