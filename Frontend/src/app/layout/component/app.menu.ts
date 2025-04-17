import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] }]
            },
            {
                label: 'Transaction',
                items: [
                    { 
                        label: 'Order Category', 
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/admin/transaction/order-category']
                    },
                    { 
                        label: 'Order List', 
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/admin/transaction/order-list']
                    }
                ]
            },
            {
                label: 'Project',
                items: [
                    { 
                        label: 'Bot App', 
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/admin/project/bot-app']
                    },
                    { 
                        label: 'Fullstack App', 
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/admin/project/fullstack-app']
                    },
                    { 
                        label: 'MVC App', 
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/admin/project/mvc-app']
                    },
                ]
            },
        ];
    }
}
