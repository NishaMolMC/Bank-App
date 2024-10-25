// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private apiUrlBs = 'http://localhost:3000' // JSON Server URL for user data
  private loggedInSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken'); // Assuming the user is stored in localStorage
  }
  
  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlBs}/transactions`);
  }

  addTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, transaction);
  }

  // Register new user
  register(accountNumber: string, name: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?accountNumber=${accountNumber}`).pipe(
      map(users => {
        if (users.length > 0) {
          throw new Error('Account number already exists');  // Validate unique account number
        } else {
          const newUser = { accountNumber, name, password };
          return this.http.post(this.apiUrl, newUser).subscribe(() => {
            this.router.navigate(['/auth/login']); // Redirect to login on successful registration
          });
        }
      })
    );
  }

  // Login user
  login(accountNumber: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.accountNumber === accountNumber && u.password === password);
        if (user) {
          // If user is found, store user info in localStorage and update loggedInSubject
          localStorage.setItem('user', JSON.stringify(user));
          this.loggedInSubject.next(true);
          return true;
        } else {
          return false;
        }
      })
    );
  }


  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Logout user
   onLogout(): void {
    localStorage.removeItem('user');  // Remove user session
    this.loggedInSubject.next(false);
    // this.router.navigate(['/auth/login']);  // Navigate to login
  }
}











