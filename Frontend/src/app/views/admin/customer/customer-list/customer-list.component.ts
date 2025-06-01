import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table, TableModule } from 'primeng/table';
import { CustomerService } from '../../../../services/admin/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-customer-list',
  imports: [TableModule, InputTextModule, ButtonModule, IconFieldModule, InputIconModule, DatePipe],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];

  constructor(
    private customerService: CustomerService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllCustomers() {
    this.spinner.show();
    this.customerService.getAllCustomers().subscribe(
      (res: any) => {
        this.spinner.hide();
        this.customers = res.data;
      }
    )
  }
}
