import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AuthResolver } from './core/resolvers/auth.resolver';
import { LoginGuard } from '../app/core/guards/login.guard';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { ProfileGuard } from './core/guards/profile.guard';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, ProfileGuard],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'profile-setup',
    component: ProfileSetupComponent,
    canActivate: [AuthGuard],
  },
  // Default route with AuthGuard
  { path: '**', redirectTo: '/login' }, // Fallback route
];
