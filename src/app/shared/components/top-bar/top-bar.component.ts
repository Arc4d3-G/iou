import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
@Component({
  selector: 'app-top-bar',
  imports: [Menubar],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  items: MenuItem[] | undefined;

  constructor() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['/dashboard'],
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: ['/profile'],
      },
      {
        label: 'Logout',
        icon: 'pi pi-power-off',
        routerLink: ['/logout'],
      },
    ];
  }
}
