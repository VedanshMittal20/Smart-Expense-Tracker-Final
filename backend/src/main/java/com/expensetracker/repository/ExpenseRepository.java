package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // Retrieve all expenses sorted by date descending (latest first)
    List<Expense> findAllByOrderByDateDesc();

    // Filter expenses by category
    List<Expense> findByCategoryIgnoreCaseOrderByDateDesc(String category);

    // Calculate overall total amount spent
    @Query("SELECT COALESCE(SUM(e.amount), 0.0) FROM Expense e")
    Double getTotalExpenseSum();

    // Group-by aggregation: Category vs Total Amount spent (Data Analysis feature)
    @Query("SELECT e.category, SUM(e.amount) FROM Expense e GROUP BY e.category")
    List<Object[]> getCategoryWiseExpenses();
}
