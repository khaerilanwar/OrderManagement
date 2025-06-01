import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-testimoni',
  imports: [PanelModule, AvatarModule, ButtonModule, MenuModule],
  templateUrl: './testimoni.component.html',
  styleUrl: './testimoni.component.scss'
})
export class TestimoniComponent implements OnInit {
  items: { label?: string; icon?: string; separator?: boolean }[] = [];

  cek: string[] = ['1', '2', '3'];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Refresh',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Search',
        icon: 'pi pi-search'
      },
      {
        separator: true
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ];

  }
}
