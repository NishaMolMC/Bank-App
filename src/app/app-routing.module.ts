import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Guard to protect routes
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CreditComponent } from './dashboard/credit/credit.component';
import { DebitComponent } from './dashboard/debit/debit.component';
import { TransactionHistoryComponent } from './dashboard/transaction-history/transaction-history.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'auth/login', component: LoginComponent },    // Login route
  { path: 'auth/register', component: RegisterComponent },  // Register route
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'credit', component: CreditComponent },
      { path: 'debit', component: DebitComponent },
      { path: 'transaction-history', component: TransactionHistoryComponent }
    ]
  } // Dashboard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





