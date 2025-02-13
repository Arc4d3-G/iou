import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { StateService } from '../../../core/services/state.service';
@Component({
  selector: 'app-top-bar',
  imports: [ButtonModule, AvatarModule, CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  user: any;
  theme: any;

  constructor(private stateService: StateService) {}

  ngOnInit() {
    // Subscribe to user state
    this.stateService.user$.subscribe((user) => {
      this.user = user;
    });
    // Subscribe to theme state
    this.stateService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }

  toggleTheme() {
    this.stateService.toggleTheme();
  }
}
