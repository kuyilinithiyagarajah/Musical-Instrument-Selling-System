package com.projectY2S1.Musical.instrument.selling.system.services;

import com.projectY2S1.Musical.instrument.selling.system.models.FinancialRecordModel;
import com.projectY2S1.Musical.instrument.selling.system.repos.FinancialRecordRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FinancialRecordService {

    private final FinancialRecordRepo financialRecordRepo;

    public FinancialRecordService(FinancialRecordRepo financialRecordRepo) {
        this.financialRecordRepo = financialRecordRepo;
    }

    public FinancialRecordModel create(FinancialRecordModel record) {
        return financialRecordRepo.save(record);
    }

    public List<FinancialRecordModel> readAll() {
        return financialRecordRepo.findAll();
    }

    public Optional<FinancialRecordModel> readById(Long id) {
        return financialRecordRepo.findById(id);
    }

    public FinancialRecordModel update(FinancialRecordModel record) {
        return financialRecordRepo.save(record);
    }

    public void delete(Long id) {
        financialRecordRepo.deleteById(id);
    }
}
