package com.expensetracker.controller;

import com.expensetracker.dto.ExpenseSummaryDTO;
import com.expensetracker.model.Expense;
import com.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*") // Allows React frontend to connect without CORS errors
public class ExpenseController {

    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // 1. Read All (with optional ?category= filter)
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses(@RequestParam(required = false) String category) {
        return ResponseEntity.ok(expenseService.getAllExpenses(category));
    }

    // 2. Read Single by ID
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. Create New Expense
    @PostMapping
    public ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) {
        Expense created = expenseService.createExpense(expense);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // 4. Update Existing Expense
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @Valid @RequestBody Expense expense) {
        try {
            Expense updated = expenseService.updateExpense(id, expense);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 5. Delete Expense
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        try {
            expenseService.deleteExpense(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 6. Data Analysis Endpoint: Summary, Aggregations & Category Breakdown
    @GetMapping("/summary")
    public ResponseEntity<ExpenseSummaryDTO> getExpenseSummary() {
        return ResponseEntity.ok(expenseService.getExpenseSummary());
    }

    // 7. Seed Sample Data (Pre-populates sample data for instant viva demo)
    @PostMapping("/seed")
    public ResponseEntity<String> seedSampleData() {
        expenseService.createExpense(new Expense("Apartment Rent", 12500.0, "Housing", LocalDate.now().minusDays(10), "Monthly flat rent"));
        expenseService.createExpense(new Expense("Weekly Grocery", 2400.0, "Food", LocalDate.now().minusDays(5), "Supermarket vegetables and dairy"));
        expenseService.createExpense(new Expense("Electricity & Water Bill", 1650.0, "Utilities", LocalDate.now().minusDays(4), "Monthly utility payment"));
        expenseService.createExpense(new Expense("Uber / Metro Travel", 650.0, "Transport", LocalDate.now().minusDays(2), "Commute to college/work"));
        expenseService.createExpense(new Expense("Team Dinner", 1800.0, "Food", LocalDate.now().minusDays(1), "Dinner with friends"));
        expenseService.createExpense(new Expense("Netflix & Spotify", 799.0, "Entertainment", LocalDate.now(), "Monthly entertainment subscriptions"));
        return ResponseEntity.ok("Sample data seeded successfully!");
    }
}
