// src/app/dashboard/transaction-history/transaction-history.component.ts

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';  // Correct path to AuthService

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['accountId', 'accountNumber', 'amount', 'balance', 'type', 'date'];  // Define columns
  transactions = new MatTableDataSource<any>([]);  // MatTableDataSource to manage transaction data
  totalTransactions = 0;  // Track the total number of transactions

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Reference the paginator

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchTransactions();  // Fetch transactions on component init
  }

  ngAfterViewInit(): void {
    this.transactions.paginator = this.paginator;  // Attach paginator after view init
  }

  // Fetch transactions using AuthService
  fetchTransactions() {
    this.authService.getTransactions().subscribe((data: any) => {
      this.transactions.data = data;  // Assign fetched data to MatTableDataSource
      this.totalTransactions = data.length;  // Track total transactions
      this.transactions.paginator = this.paginator;  // Attach paginator to data source
    });
  }

  // Handle page change event
  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex;  // Update the page index
  }
}
