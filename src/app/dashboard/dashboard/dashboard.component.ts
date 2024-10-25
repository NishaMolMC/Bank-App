// src/app/dashboard/dashboard.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  userName: string = '';

  constructor() {}

  ngOnInit(): void {
    // Retrieve the logged-in user from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      this.userName = JSON.parse(user).name;  // Extract the name from the user object
    }
  }
}
