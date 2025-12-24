package com.projectY2S1.Musical.instrument.selling.system.views;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FinancialRecordViews {

    @GetMapping("/financial-records/create")
    public String createRecord() {
        return "financial_records/create";
    }

    @GetMapping("/financial-records/edit")
    public String editRecord() {
        return "financial_records/edit";
    }

    @GetMapping("/financial-records-view")
    public String financialRecordsList() {
        return "financial_records/list";
    }

    @GetMapping("/financial-records/chart")
    public String financialRecordsChart() {
        return "financial_records/charts";
    }
}
