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
                label: 'Order Management',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin']
                    },
                    {
                        label: 'Order',
                        icon: 'pi pi-fw pi-id-card',
                        items: [
                            {
                                label: 'Order List',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/admin/order/list']
                            },
                            {
                                label: 'Order Category',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/admin/order/category']
                            }
                        ]
                    },
                    {
                        label: 'Project',
                        icon: 'pi pi-fw pi-id-card',
                        items: [
                            {
                                label: 'Bot',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/admin/project/bot']
                            },
                            {
                                label: 'Fullstack',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/admin/project/fullstack']
                            },
                            {
                                label: 'Web Scraping',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/admin/project/web-scraping']
                            }
                        ]
                    },
                    {
                        label: 'Customer',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/admin/customer']
                    },
                    {
                        label: 'Lisensi',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/admin/customer/license']
                    }
                ]
            }
        ];
    }
}
