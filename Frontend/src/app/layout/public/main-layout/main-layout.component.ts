import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { menuItems } from '../data';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [Menubar, RouterModule],
  standalone: true,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  items: MenuItem[] | undefined
  
  ngOnInit(): void {
    this.items = menuItems
  }
}
