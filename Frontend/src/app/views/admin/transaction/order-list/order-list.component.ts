import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../../../../services/admin/order.service';
import { Table, TableModule } from 'primeng/table';
import { OrderList } from '../../../../models/admin/transaction/order-list';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { StatusService } from '../../../../services/admin/status.service';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '../../../../services/admin/category.service';

@Component({
    selector: 'app-order-list',
    imports: [FormsModule, TableModule, ButtonModule, MultiSelectModule, SelectModule, SliderModule, ProgressBarModule, TagModule, InputIconModule, IconFieldModule, BadgeModule, InputTextModule, CurrencyPipe, DatePipe],
    templateUrl: './order-list.component.html',
    styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
    orders!: OrderList[];
    selectedOrder!: OrderList;
    statuses: any[] = [];
    categories: any[] = [];

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private orderService: OrderService,
        private categoryService: CategoryService,
        private statusService: StatusService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.getOrders();
        this.getAllStatuses();
        this.getAllCategories();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onRowSelect(event: any) {
        this.router.navigate([`/admin/order/detail/${event.data.id}`]);
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getOrders() {
        this.spinner.show();
        this.orderService.getListOrders().subscribe((res: any) => {
            this.spinner.hide();
            this.orders = res.data;
        });
    }

    getAllStatuses() {
        this.statusService.getStatus().subscribe((res: any) => {
            this.statuses = res.data.map((status: any) => ({
                label: status.detail,
                value: status.detail
            }));
        });
    }

    getAllCategories() {
        this.categoryService.getAllCategories().subscribe((res: any) => {
            this.categories = res.data.map((category: any) => ({
                label: category.name,
                value: category.name
            }));
        });
    }

    getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
        switch (status) {
            case 'Pesanan Baru':
                return 'info';
            case 'Menunggu Pembayaran':
                return 'warn';
            case 'Menunggu Konfirmasi':
                return 'secondary';
            case 'Sedang Diproses':
                return 'contrast';
            case 'Pesanan Selesai':
                return 'success';
            case 'Pesanan Dibatalkan':
                return 'danger';
            default:
                return 'secondary';
        }
    }

    limitString(value: string, limit: number): string {
        if (!value) return '';
        if (value.length <= limit) return value;
        return value.substring(0, limit) + '...';
    }
}
