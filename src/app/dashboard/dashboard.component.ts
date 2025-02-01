import { Component } from '@angular/core';
import { OverviewComponent } from './components/overview/overview.component';

@Component({
  selector: 'app-dashboard',
  imports: [OverviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
