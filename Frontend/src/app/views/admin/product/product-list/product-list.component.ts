import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { OrderService } from '../../../../services/public/order.service';
import { DrawerModule } from 'primeng/drawer';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-product-list',
  imports: [TableModule, CommonModule, FileUploadModule, InputTextModule, SelectModule, ButtonModule, TagModule, FormsModule, DrawerModule, TextareaModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  products: any[] = []
  displayDrawer: boolean = false;
  categories: any[] = [];
  uploadedFiles: any[] = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  onToggleDrawer() {
    this.displayDrawer = !this.displayDrawer;
  }

  onUpload(event: UploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  getAllProducts() {
    this.orderService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res.data;
      }
    )
  }

  limitString(value: string, limit: number): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}
