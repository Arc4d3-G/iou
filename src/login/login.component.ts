import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterOutlet,
    InputTextModule,
    CardModule,
    FormsModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isRegistering: boolean = true;
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  error: string | null = null;

  constructor(private authService: AuthService) {}

  toggleMode() {
    this.isRegistering = !this.isRegistering;
  }

  onSubmit() {
    this.error = null;
    if (this.isRegistering) {
      this.authService.registerUser(this.email, this.password).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Registration success:', response.data);
          } else {
            this.error =
              response.error?.message || 'An unexpected error occurred';
          }
        },
        error: (error) => {
          this.error = error.message;
        },
      });
    } else {
      this.authService.loginUser(this.email, this.password).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            console.log('Login success:', response.data);
            this.authService.setToken(response.data.token);
          } else {
            this.error =
              response.error?.message || 'An unexpected error occurred';
          }
        },
        error: (error) => {
          this.error = error.message; // Display the error message
        },
      });
    }
  }
}
