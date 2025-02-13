import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'dark';

  constructor() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);
  }

  setTheme(theme: string) {
    const html = document.querySelector('html');
    html?.classList.remove('light', 'dark');
    html?.classList.add(theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme); // Persist theme
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getTheme() {
    return this.currentTheme;
  }
}
