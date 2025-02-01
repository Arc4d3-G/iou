import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-overview',
  imports: [DividerModule, PanelModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  public totalOwed = '0.00';
  public totalCredit = '0.00';
  public recentActivity = [];
}
