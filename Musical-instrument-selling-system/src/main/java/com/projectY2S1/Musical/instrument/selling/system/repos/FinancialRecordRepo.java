package com.projectY2S1.Musical.instrument.selling.system.repos;

import com.projectY2S1.Musical.instrument.selling.system.models.FinancialRecordModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialRecordRepo extends JpaRepository<FinancialRecordModel, Long> {
}
