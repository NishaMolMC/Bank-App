import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { accountNumber, password } = this.loginForm.value;
      
      // Call the AuthService to validate login credentials
      this.authService.login(accountNumber, password).subscribe({
        next: (isValidUser: boolean) => {
          if (isValidUser) {
            this.errorMessage = '';  // Clear any previous errors
            alert("Login successful!");
            this.router.navigate(['/dashboard']);  // Navigate to dashboard on success
          } else {
            this.errorMessage = 'Invalid account number or password';  // Set error message on failure
          }
        },
        error: () => {
          this.errorMessage = 'An error occurred during login. Please try again.';
        }
      });
    }
  }

  // Check if form controls are invalid and touched
  isAccountNumberInvalid() {
    return this.loginForm.get('accountNumber')?.invalid && this.loginForm.get('accountNumber')?.touched;
  }

  isPasswordInvalid() {
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
  }

  onLogin(): void {
    this.onSubmit();  // You can directly call onSubmit() for form handling
  }
}
