import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/admin/order.service';
import { Table, TableModule } from 'primeng/table';
import { OrderList } from '../../../../models/admin/transaction/order-list';
import { DatePipe } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-order-list',
    imports: [TableModule, InputIconModule, IconFieldModule, BadgeModule, InputTextModule, DatePipe],
    templateUrl: './order-list.component.html',
    styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
    orders!: OrderList[];
    selectedOrder!: OrderList;

    constructor(
        private orderService: OrderService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.getOrders();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onRowSelect(event: any) {
        this.router.navigate([`/admin/order/detail/${event.data.id}`]);
    }

    getOrders() {
        this.spinner.show();
        this.orderService.getListOrders().subscribe((res: any) => {
            this.spinner.hide();
            this.orders = res.data;
        });
    }
}
