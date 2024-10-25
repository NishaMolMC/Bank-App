import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionHistoryComponent } from './transaction-history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import HttpClientTestingModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // For Material animations
import { MatFormFieldModule } from '@angular/material/form-field';  // For Material Form Fields
import { MatInputModule } from '@angular/material/input';  // For Material Input Fields
import { MatButtonModule } from '@angular/material/button';  // For Material Button
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionHistoryComponent],
      imports: [
        ReactiveFormsModule,  // For reactive forms
        HttpClientTestingModule,  // Mock HttpClient
        BrowserAnimationsModule,  // Required for Angular Material components
        MatFormFieldModule,  // Required for Material form fields
        MatInputModule,  // Required for Material input fields
        MatButtonModule , // Required for Material buttons
        MatCardModule,
        MatPaginatorModule,
        MatTableModule  
      ],
      providers: [DashboardService]  // Provide DashboardService
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
