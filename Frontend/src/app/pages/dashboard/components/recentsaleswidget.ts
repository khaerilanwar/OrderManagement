import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `
    @if (orders) {
    <div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Recent Order</div>
        <p-table [value]="orders" [rows]="5" responsiveLayout="scroll">
            <ng-template #header>
                <tr>
                    <th pSortableColumn="title">Name <p-sortIcon field="title"></p-sortIcon></th>
                    <th pSortableColumn="category.name">Category <p-sortIcon field="category.name"></p-sortIcon></th>
                    <th>View</th>
                </tr>
            </ng-template>
            <ng-template #body let-order>
                <tr>
                    <td style="width: 35%; min-width: 7rem;">{{ order.title }}</td>
                    <td style="width: 35%; min-width: 8rem;">{{ order.product.category.name }}</td>
                    <td style="width: 15%;">
                        <button (click)="viewDetail(order.id)" pButton pRipple type="button" icon="pi pi-search" class="p-button p-component p-button-text p-button-icon-only"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>}`
})
export class RecentSalesWidget implements OnChanges {
    @Input() orders: any;

    constructor(
        private router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['recentData']) {
            this.orders = changes['recentData'].currentValue;
        }
    }

    viewDetail(orderId: string) {
        this.router.navigate(['/admin/order/detail/', orderId]);
    }
}
