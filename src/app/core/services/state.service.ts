import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root', // Makes it globally available
})
export class StateService {
  constructor(private themeService: ThemeService) {}
  // Store global user state
  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable(); // Expose as observable

  // Store theme preference (default to 'dark')
  private themeSubject = new BehaviorSubject<string>('dark');
  theme$ = this.themeSubject.asObservable();

  // Update user state
  setUser(user: any) {
    this.userSubject.next(user);
  }

  // Clear user state (logout)
  clearUser() {
    this.userSubject.next(null);
  }

  // Update theme
  toggleTheme() {
    this.themeService.toggleTheme();
    this.themeSubject.next(this.themeService.getTheme());
    console.log('Theme set to:', this.themeSubject.value);
    localStorage.setItem('theme', this.themeSubject.value); // Persist in localStorage
  }
}
