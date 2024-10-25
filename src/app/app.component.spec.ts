// src/app/app.component.spec.ts

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';  // Import RouterTestingModule
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';  // Example Material Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // For Material animations

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,  // For routing
        HttpClientTestingModule,  // Mock HttpClient requests
        MatToolbarModule,  // Example Material module
        BrowserAnimationsModule  // Required for Angular Material animations
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
