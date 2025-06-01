import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { Product, ProductService } from '../../../pages/service/product.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/public/order.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, DataViewModule, SelectButtonModule, FormsModule, TagModule, ButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  // stateOptions: any[] = [
  //   { label: 'All', value: 'all' },
  //   { label: 'Bot', value: 'bot' },
  //   { label: 'Web', value: 'web' },
  //   { label: 'Design', value: 'design' }
  // ];
  // value: string = 'all';

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();

    // this.products = [
    //   { name: 'Web Scraping', category: 'BOT', image: 'dinkes bayi ori.png' },
    //   { name: 'Aplikasi Web', category: 'WEB', image: 'gaptech ori.png' },
    //   { name: 'Point of Sales', category: 'WEB', image: 'histore ori.png' },
    //   { name: 'Bot Facebook', category: 'BOT', image: 'bot fb.png' },
    //   { name: 'Web Infografis', category: 'WEB', image: 'infografis original.png' },
    //   { name: 'Aplikasi WMS', category: 'WEB', image: 'gaptech ori.png' },
    // ]
  }

  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warn';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return 'info';
    }
  }

  getAllProducts() {
    this.orderService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res.data
      }
    )
  }

}
