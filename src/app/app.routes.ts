import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AuthResolver } from './core/resolvers/auth.resolver';
import { LoginGuard } from '../app/core/guards/login.guard';
export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, // Default route with AuthGuard
  { path: '**', redirectTo: '/login' }, // Fallback route
];
