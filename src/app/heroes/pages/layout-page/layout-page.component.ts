import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToolbarItemsInterface } from 'src/app/shared/interface';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public toolbarItems : Array<ToolbarItemsInterface> = [
    { label: 'See all', icon: 'list', url: '/heroes/list' },
    { label: 'Search', icon: 'search', url: '/heroes/search' },
    { label: 'Add', icon: 'add', url: '/heroes/new-hero' },
  ];

  constructor(
    private authService     : AuthService,
    private router          : Router,
  ) { }

  get currentUser() : UserInterface | undefined {
    return this.authService.getCurrentUser();
  }
  public doLogout() {
    this.authService.logout();
    this.router.navigate(['/auth'])
  }
}
