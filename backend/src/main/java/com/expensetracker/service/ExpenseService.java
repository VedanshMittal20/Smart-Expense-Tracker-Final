package com.expensetracker.service;

import com.expensetracker.dto.ExpenseSummaryDTO;
import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // Get all expenses (with optional category filter)
    public List<Expense> getAllExpenses(String category) {
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("All")) {
            return expenseRepository.findByCategoryIgnoreCaseOrderByDateDesc(category.trim());
        }
        return expenseRepository.findAllByOrderByDateDesc();
    }

    // Get single expense by ID
    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }

    // Create a new expense
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // Update existing expense
    public Expense updateExpense(Long id, Expense updatedExpense) {
        return expenseRepository.findById(id).map(existing -> {
            existing.setTitle(updatedExpense.getTitle());
            existing.setAmount(updatedExpense.getAmount());
            existing.setCategory(updatedExpense.getCategory());
            existing.setDate(updatedExpense.getDate());
            existing.setDescription(updatedExpense.getDescription());
            return expenseRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Expense not found with ID: " + id));
    }

    // Delete an expense
    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new RuntimeException("Expense not found with ID: " + id);
        }
        expenseRepository.deleteById(id);
    }

    // Business Logic / Analytics: Compute Summary & Category Breakdown
    public ExpenseSummaryDTO getExpenseSummary() {
        Double total = expenseRepository.getTotalExpenseSum();
        long count = expenseRepository.count();
        double avg = (count > 0 && total != null) ? Math.round((total / count) * 100.0) / 100.0 : 0.0;

        List<Object[]> rawGroupings = expenseRepository.getCategoryWiseExpenses();
        Map<String, Double> breakdown = new LinkedHashMap<>();
        String topCat = "None";
        double maxCatTotal = -1.0;

        for (Object[] row : rawGroupings) {
            String cat = (String) row[0];
            Double catSum = (Double) row[1];
            breakdown.put(cat, catSum != null ? catSum : 0.0);
            if (catSum != null && catSum > maxCatTotal) {
                maxCatTotal = catSum;
                topCat = cat;
            }
        }

        return new ExpenseSummaryDTO(total, count, avg, topCat, breakdown);
    }
}
