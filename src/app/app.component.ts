import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { StateService } from './core/services/state.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'IOU';

  constructor(private stateService: StateService) {}

  // ngOnInit() {
  //   const savedTheme = localStorage.getItem('theme') || 'dark';
  //   this.stateService.setTheme(savedTheme);
  // }
}
