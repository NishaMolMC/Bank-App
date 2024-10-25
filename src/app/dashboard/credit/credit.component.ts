// src/app/dashboard/credit/credit.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
})
export class CreditComponent {
  creditForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) {
    this.creditForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      creditAmount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.creditForm.valid) {
      const { accountNumber, creditAmount } = this.creditForm.value;

      // Step 1: Credit the account
      this.dashboardService.creditAccount(accountNumber, creditAmount).subscribe({
        next: () => {
          // Step 2: Add the credit transaction to the history
          this.dashboardService.addTransaction({
            accountNumber,
            amount: creditAmount,
            type: 'Credit',
            date: new Date().toISOString() // Record the current date and time
          }).subscribe({
            next: () => {
              this.successMessage = 'Amount credited successfully and transaction recorded!';
            },
            error: (err) => {
              console.error('Error recording transaction:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error crediting account:', err);
        }
      });
    }
  }

  // Add the onCredit method for debugging or custom logic
  onCredit(): void {
    if (this.creditForm.valid) {
      const accountNumber = this.creditForm.value.accountNumber;
      const creditAmount = this.creditForm.value.creditAmount;

      console.log(`Crediting account number: ${accountNumber} with amount: ${creditAmount}`);

      // Submit form programmatically
      this.onSubmit();
    } else {
      console.log('Form is invalid');
    }
  }
}

