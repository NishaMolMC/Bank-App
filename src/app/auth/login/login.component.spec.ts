// src/app/auth/login/login.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // For mocking HttpClient
import { MatFormFieldModule } from '@angular/material/form-field';  // For Material form fields
import { MatInputModule } from '@angular/material/input';  // For Material input fields
import { MatButtonModule } from '@angular/material/button';  // For Material buttons
import { MatCardModule } from '@angular/material/card';  // For mat-card
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // For animations

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,  // For reactive forms
        HttpClientTestingModule,  // Mock HttpClient
        BrowserAnimationsModule,  // Required for Angular Material components
        MatFormFieldModule,  // Required for Material form fields
        MatInputModule,  // Required for Material input fields
        MatButtonModule,  // Required for Material buttons
        MatCardModule  // Required for Material cards (mat-card)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
