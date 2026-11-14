package com.expensetracker.dto;

import java.util.Map;

public class ExpenseSummaryDTO {

    private Double totalExpenses;
    private Long totalTransactions;
    private Double averageExpense;
    private String topCategory;
    private Map<String, Double> categoryBreakdown;

    public ExpenseSummaryDTO() {
    }

    public ExpenseSummaryDTO(Double totalExpenses, Long totalTransactions, Double averageExpense, String topCategory, Map<String, Double> categoryBreakdown) {
        this.totalExpenses = totalExpenses;
        this.totalTransactions = totalTransactions;
        this.averageExpense = averageExpense;
        this.topCategory = topCategory;
        this.categoryBreakdown = categoryBreakdown;
    }

    public Double getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(Double totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public Long getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(Long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public Double getAverageExpense() {
        return averageExpense;
    }

    public void setAverageExpense(Double averageExpense) {
        this.averageExpense = averageExpense;
    }

    public String getTopCategory() {
        return topCategory;
    }

    public void setTopCategory(String topCategory) {
        this.topCategory = topCategory;
    }

    public Map<String, Double> getCategoryBreakdown() {
        return categoryBreakdown;
    }

    public void setCategoryBreakdown(Map<String, Double> categoryBreakdown) {
        this.categoryBreakdown = categoryBreakdown;
    }
}
