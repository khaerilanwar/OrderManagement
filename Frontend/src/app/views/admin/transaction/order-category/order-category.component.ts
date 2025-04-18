import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OrderCategory } from '../../../../models/admin/transaction/order-category';
import { TransactionService } from '../../../../services/admin/transaction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-order-category',
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './order-category.component.html',
  styleUrl: './order-category.component.scss'
})
export class OrderCategoryComponent implements OnInit {
  orderCategories: OrderCategory[] = []
  isLoadOrderCategory: boolean = false

  constructor (
    private transactionService: TransactionService
  ) {}
  
  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this.isLoadOrderCategory = true
    this.transactionService.getAllCategories().subscribe(
      (res: any) => {
        this.isLoadOrderCategory = false
        this.orderCategories = res
      },
      (err: HttpErrorResponse) => {
        console.error(err)
      }
    )
  }
}
