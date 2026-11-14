package com.expensetracker;

import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class ExpenseTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExpenseTrackerApplication.class, args);
    }

    // Auto-seed initial demo data so the app looks complete the moment it runs
    @Bean
    CommandLineRunner initDatabase(ExpenseRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Expense("Apartment Rent", 12500.0, "Housing", LocalDate.now().minusDays(10), "Monthly flat rent"));
                repository.save(new Expense("Supermarket Groceries", 2400.0, "Food", LocalDate.now().minusDays(6), "Vegetables, groceries and fruits"));
                repository.save(new Expense("Electricity & Water", 1650.0, "Utilities", LocalDate.now().minusDays(4), "Monthly electricity bill"));
                repository.save(new Expense("Metro & Cab Travel", 750.0, "Transport", LocalDate.now().minusDays(2), "Weekly travel commute"));
                repository.save(new Expense("Weekend Team Dinner", 1850.0, "Food", LocalDate.now().minusDays(1), "Dinner with project group"));
                repository.save(new Expense("Cloud & Streaming Subs", 899.0, "Entertainment", LocalDate.now(), "Digital subscriptions"));
                System.out.println(">>> Demo data pre-loaded into H2 database successfully!");
            }
        };
    }
}
