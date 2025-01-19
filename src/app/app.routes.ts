import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from '../auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Public route
  { path: 'app', component: AppComponent, canActivate: [AuthGuard] }, // Protected route
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login' }, // Fallback route
];
