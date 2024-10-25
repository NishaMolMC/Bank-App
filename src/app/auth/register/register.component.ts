import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router  // Inject Router to navigate after registration
  ) {
    this.registerForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { accountNumber, name, password } = this.registerForm.value;
      this.authService.register(accountNumber, name, password).subscribe({
        next: () => {
          this.errorMessage = '';  // Clear previous error
          this.router.navigate(['/login']);  // Redirect to login on success
        },
        error: (err) => {
          this.errorMessage = 'Registration failed. Account number may not be unique.';  // Show error if account number is not unique
        }
      });
    }
  }

  // Check if form controls are invalid and touched
  isAccountNumberInvalid() {
    return this.registerForm.get('accountNumber')?.invalid && this.registerForm.get('accountNumber')?.touched;
  }

  isNameInvalid() {
    return this.registerForm.get('name')?.invalid && this.registerForm.get('name')?.touched;
  }

  isPasswordInvalid() {
    return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched;
  }

  // The logic for form submission and interaction with the AuthService
  onRegister(): void {
    if (this.registerForm.valid) {
      const { accountNumber, name, password } = this.registerForm.value;

      this.authService.register(accountNumber, name, password).subscribe({
        next: () => {
          alert('User registered successfully');
          this.errorMessage = '';  // Clear any previous errors
          this.router.navigate(['/login']);  // Navigate to login after successful registration
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.errorMessage = 'Registration failed. Account number may not be unique or other error occurred.';
        }
      });
    } else {
      console.log('Form is invalid');
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}

