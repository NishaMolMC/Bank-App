import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';  // Ensure AuthService is correctly imported

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bank Application';

  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, private router: Router) {
    // Subscribe to the login state observable in the AuthService to reactively track login status
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;  // Update the isLoggedIn variable based on the user's login status
    });
  }

  // Method to log out the user
  onLogout() {
    this.authService.onLogout();  // Use the logout method from AuthService
    this.router.navigate(['/auth/login']);  // Navigate to the login page after logout
  }

  // Method to check if user is logged in
  // isLoggedIn() {
  //   return this.authService.isLoggedIn();
  // }
}
