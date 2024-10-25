// src/app/dashboard/debit/debit.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
})
export class DebitComponent {
  debitForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.debitForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      debitAmount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.debitForm.valid) {
      const { accountNumber, debitAmount } = this.debitForm.value;

      // Step 1: Debit the account
      this.dashboardService.debitAccount(accountNumber, debitAmount).subscribe({
        next: () => {
          // Step 2: Add the debit transaction to the history
          this.dashboardService.addTransaction({
            accountNumber,
            amount: debitAmount,
            type: 'Debit',
            date: new Date().toISOString()  // Record the current date and time
          }).subscribe({
            next: () => {
              this.successMessage = 'Amount debited successfully and transaction recorded!';
            },
            error: (err) => {
              console.error('Error recording transaction:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error debiting account:', err);
        }
      });
    }
  }

  // Add the onDebit method for debugging or custom logic
  onDebit(): void {
    if (this.debitForm.valid) {
      const accountNumber = this.debitForm.value.accountNumber;
      const debitAmount = this.debitForm.value.debitAmount;

      console.log(`Debiting account number: ${accountNumber} with amount: ${debitAmount}`);

      // Submit form programmatically
      this.onSubmit();
    } else {
      console.log('Form is invalid');
    }
  }
}
