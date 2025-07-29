package com.flowbill.controller;

import com.flowbill.dto.InvoiceDTO;
import com.flowbill.model.Invoice;
import com.flowbill.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoice")
@RequiredArgsConstructor
@CrossOrigin
public class InvoiceController {
    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody InvoiceDTO dto) {
        Invoice saved = invoiceService.createInvoice(dto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoice(@PathVariable Long id) {
        Invoice invoice = invoiceService.getInvoice(id);
        if (invoice == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(invoice);
    }

    // Stubbed endpoints for PDF generation and email sending.
    @PostMapping("/pdf")
    public ResponseEntity<String> generatePdf() {
        // TODO: implement PDF generation
        return ResponseEntity.ok("PDF generation is not implemented yet.");
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendInvoice() {
        // TODO: implement email sending
        return ResponseEntity.ok("Email sending is not implemented yet.");
    }

    @PostMapping("/generate")
    public ResponseEntity<String> aiGenerateInvoice() {
        // TODO: implement AI assisted invoice generation
        return ResponseEntity.ok("AI invoice generation is not implemented yet.");
    }
}