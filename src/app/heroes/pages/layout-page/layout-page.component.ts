import { Component } from '@angular/core';
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
}
