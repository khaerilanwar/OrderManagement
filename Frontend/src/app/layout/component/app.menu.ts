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
                        icon: 'pi pi-fw pi-shop',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-caret-right',
                                routerLink: ['/admin/order/list']
                            },
                            // {
                            //     label: 'Category',
                            //     icon: 'pi pi-fw pi-caret-right',
                            //     routerLink: ['/admin/order/category']
                            // },
                            {
                                label: 'Top Up',
                                icon: 'pi pi-fw pi-caret-right',
                                routerLink: ['/admin/order/topup']
                            },
                            {
                                label: 'Report',
                                icon: 'pi pi-fw pi-caret-right',
                                routerLink: ['/admin/order/report']
                            }
                        ]
                    },
                    {
                        label: 'Product',
                        icon: 'pi pi-fw pi-gift',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-caret-right',
                                routerLink: ['/admin/product/list']
                            },
                            {
                                label: 'Category',
                                icon: 'pi pi-fw pi-caret-right',
                                routerLink: ['/admin/product/category']
                            }
                        ]
                    },
                    {
                        label: 'Customer',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/admin/customer']
                    },
                    {
                        label: 'Lisensi',
                        icon: 'pi pi-fw pi-qrcode',
                        routerLink: ['/admin/customer/license']
                    },
                    {
                        label: 'Chatting',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/admin/customer/chatting']
                    }
                ]
            }
        ];
    }
}
