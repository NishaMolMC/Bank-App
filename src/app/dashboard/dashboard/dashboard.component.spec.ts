// src/app/dashboard/dashboard.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';  // Import MatListModule for mat-nav-list
import { HttpClientTestingModule } from '@angular/common/http/testing';  // For HttpClient
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // For animations
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';



describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        HttpClientTestingModule,  // Mock HttpClient
        MatToolbarModule,  // For Material toolbar
        MatSidenavModule,  // For Material sidenav
        MatListModule,  // For Material list (mat-nav-list)
        BrowserAnimationsModule,  // For Material animations
        MatIconModule,
        RouterTestingModule 
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
