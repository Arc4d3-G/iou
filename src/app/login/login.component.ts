import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    CardModule,
    FormsModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  // animations: [
  //   trigger('templateChange', [
  //     state('registering', style({ opacity: 1 })),
  //     state('loggingIn', style({ opacity: 1 })),
  //     transition('registering <=> loggingIn', [
  //       style({ height: 0, opacity: 0 }),
  //       animate('0.5s linear', style({ height: '*', opacity: 1 })),
  //     ]),
  //   ]),
  // ],
})
export class LoginComponent {
  isRegistering: boolean = true;
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

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
          this.error = error.message || 'An unexpected error occurred';
        },
      });
    } else {
      this.authService.loginUser(this.email, this.password).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            console.log('Login success:', response.data);
            this.authService.setToken(response.data.token);
            this.router.navigate(['/dashboard']);
          } else {
            this.error =
              response.error?.message || 'An unexpected error occurred';
          }
        },
        error: (error) => {
          console.log({ errorAtLogin: error });
          this.error = error.message || 'An unexpected error occurred';
        },
      });
    }
  }
}
