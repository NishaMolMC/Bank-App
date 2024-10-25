// src/app/dashboard/dashboard.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000';  // Adjust according to your JSON Server URL

  constructor(private http: HttpClient) {}

  creditAccount(accountNumber: string, creditAmount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, {
      accountNumber,
      type: 'credit',
      amount: creditAmount,
      date: new Date()
    });
  }

  debitAccount(accountNumber: string, debitAmount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, {
      accountNumber,
      type: 'debit',
      amount: debitAmount,
      date: new Date(),
    });
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions`);
  }

  addTransaction(transaction: {accountNumber: string, amount: number, type: string, date: string}): Observable<any> {
    const url = `${this.apiUrl}/transactions`;  // Assuming transactions are stored under /transactions
    return this.http.post(url, transaction);
  }
  
}
