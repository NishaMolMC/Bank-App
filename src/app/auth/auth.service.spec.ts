// src/app/auth/auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();  // Verify that no unmatched requests are outstanding
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch transactions', () => {
    const mockTransactions = [
      { id: 1, accountNumber: '1000', amount: 200, type: 'Credit', date: '2024-09-18T10:00:00Z' },
      { id: 2, accountNumber: '1005', amount: 100, type: 'Debit', date: '2024-09-19T12:00:00Z' }
    ];

    service.getTransactions().subscribe(transactions => {
      expect(transactions).toEqual(mockTransactions);  // Assert that transactions match mock data
    });

    const req = httpTestingController.expectOne(`${apiUrl}/transactions`);
    expect(req.request.method).toEqual('GET');  // Check that the request method is GET
    req.flush(mockTransactions);  // Mock the response
  });

});
