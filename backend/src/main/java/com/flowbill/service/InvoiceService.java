package com.flowbill.service;

import com.flowbill.dto.InvoiceDTO;
import com.flowbill.dto.InvoiceItemDTO;
import com.flowbill.model.Client;
import com.flowbill.model.Invoice;
import com.flowbill.model.InvoiceItem;
import com.flowbill.repository.ClientRepository;
import com.flowbill.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;

    @Transactional
    public Invoice createInvoice(InvoiceDTO dto) {
        // Persist or fetch existing client
        Client client = Client.builder()
                .name(dto.getClientName())
                .email(dto.getClientEmail())
                .address(dto.getClientAddress())
                .build();
        client = clientRepository.save(client);

        Invoice invoice = Invoice.builder()
                .client(client)
                .invoiceNumber(dto.getInvoiceNumber())
                .date(LocalDate.parse(dto.getDate()))
                .dueDate(LocalDate.parse(dto.getDueDate()))
                .tax(dto.getTax() == null ? BigDecimal.ZERO : dto.getTax())
                .discount(dto.getDiscount() == null ? BigDecimal.ZERO : dto.getDiscount())
                .notes(dto.getNotes())
                .build();

        BigDecimal subtotal = BigDecimal.ZERO;
        if (dto.getItems() != null) {
            for (InvoiceItemDTO itemDTO : dto.getItems()) {
                BigDecimal amount = itemDTO.getRate().multiply(BigDecimal.valueOf(itemDTO.getQuantity()));
                subtotal = subtotal.add(amount);

                InvoiceItem item = InvoiceItem.builder()
                        .invoice(invoice)
                        .description(itemDTO.getDescription())
                        .quantity(itemDTO.getQuantity())
                        .rate(itemDTO.getRate())
                        .amount(amount)
                        .build();
                invoice.getItems().add(item);
            }
        }
        invoice.setSubtotal(subtotal);
        BigDecimal total = subtotal.add(invoice.getTax()).subtract(invoice.getDiscount());
        invoice.setTotal(total);

        return invoiceRepository.save(invoice);
    }

    public Invoice getInvoice(Long id) {
        return invoiceRepository.findById(id).orElse(null);
    }
}