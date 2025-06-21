import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DrawerModule } from 'primeng/drawer';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../services/admin/order.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { InputNumberModule } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-product-list',
  imports: [TableModule, IconFieldModule, InputIconModule, InputNumberModule, CommonModule, FileUploadModule, InputTextModule, SelectModule, ButtonModule, TagModule, FormsModule, DrawerModule, TextareaModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  resourceUrl: string = environment.resourceUrl;
  products: any[] = []
  displayDrawer: boolean = false;
  categories: any[] = [];
  drawerHeader: string = ''
  productSelected!: any
  isLoadingChangeStatus: boolean = false;

  // form input
  inputName: string = '';
  inputDescription: string = '';
  productPrice: number = 0;
  categorySelected!: any

  constructor(
    private orderService: OrderService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllProductCategories();
  }

  onToggleDrawer(type: 'new' | 'edit', product?: any) {
    this.displayDrawer = !this.displayDrawer;
    if (type === 'new') {
      this.drawerHeader = 'Create New Product';
      this.inputName = '';
      this.inputDescription = '';
      this.categorySelected = undefined;
    } else if (type === 'edit' && product) {
      this.drawerHeader = 'Edit Product';
      this.inputName = product.name;
      this.inputDescription = product.description;
      this.categorySelected = this.categories.find(c => c.id === product.category.id);
      this.productSelected = product;
    }
  }

  getAllProducts() {
    this.orderService.getAllProducts().subscribe(
      (res: any) => {
        this.products = res.data;
      }
    )
  }

  getAllProductCategories() {
    this.orderService.getAllProductCategories().subscribe(
      (res: any) => {
        this.categories = res.data;
      }
    )
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  saveNewProduct(type: string, fileUploader: FileUpload) {
    if (type === 'new') {
      if (fileUploader.files.length === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Please select a file to upload.'
        })
        return
      }

      this.orderService.createNewProduct(
        {
          name: this.inputName,
          description: this.inputDescription,
          categoryId: this.categorySelected.id
        },
        fileUploader.files[0] as File
      ).subscribe(
        (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product created successfully.'
          });
          this.displayDrawer = false;
          this.getAllProducts();
          fileUploader.clear();
          this.inputName = '';
          this.inputDescription = '';
          this.categorySelected = undefined;
        },
        (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message || 'An error occurred while creating the product.'
          });
        }
      )
    }
    else if (type === 'edit') {
      if (fileUploader.files.length > 0) {
        this.orderService.updateProduct(
          this.productSelected.id,
          {
            name: this.inputName,
            description: this.inputDescription
          },
          fileUploader.files[0] as File
        ).subscribe(
          (res: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product updated successfully.'
            });
            this.displayDrawer = false;
            this.getAllProducts();
            fileUploader.clear();
            this.inputName = '';
            this.inputDescription = '';
            this.categorySelected = undefined;
          },
          (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.message || 'An error occurred while updating the product.'
            });
          }
        )
      } else {
        this.orderService.updateProduct(
          this.productSelected.id,
          {
            name: this.inputName,
            description: this.inputDescription
          }
        ).subscribe(
          (res: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product updated successfully.'
            });
            this.displayDrawer = false;
            this.getAllProducts();
            fileUploader.clear();
            this.inputName = '';
            this.inputDescription = '';
            this.categorySelected = undefined;
          },
          (err: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.message || 'An error occurred while updating the product.'
            });
          }
        )
      }
    }
  }

  onChangeStatus(productId: string, status: boolean) {
    const finalStatus = !status
    this.isLoadingChangeStatus = true;
    this.orderService.updateProductStatus(productId, finalStatus).subscribe(
      (res: any) => {
        this.isLoadingChangeStatus = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${finalStatus ? 'activated' : 'deactivated'} successfully.`
        });
        this.getAllProducts();
      },
      (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'An error occurred while updating the product status.'
        });
      }
    )
  }

  limitString(value: string, limit: number): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}
