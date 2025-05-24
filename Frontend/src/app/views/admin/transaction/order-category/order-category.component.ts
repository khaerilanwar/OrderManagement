import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { OrderCategory } from '../../../../models/admin/transaction/order-category';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../../../../services/admin/category.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthService } from '../../../../services/admin/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-order-category',
    imports: [TableModule, ToastModule, ConfirmDialogModule, TextareaModule, CommonModule, ButtonModule, IconFieldModule, InputIconModule, InputTextModule, DialogModule, FormsModule],
    templateUrl: './order-category.component.html',
    styleUrl: './order-category.component.scss',
    providers: [ConfirmationService]
})
export class OrderCategoryComponent implements OnInit {
    orderCategories: OrderCategory[] = [];
    isLoadOrderCategory: boolean = false;

    // Dialog
    headerModal: string = 'New Category';
    displayModal: boolean = false;
    categoryInput: any = { id: '', name: '', description: '' };

    constructor(
        private spinner: NgxSpinnerService,
        private categoryService: CategoryService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.getAllCategories();
    }

    onOpenEditModal(id: string) {
        this.onToggleModal();
        this.headerModal = 'Edit Category';
        const selectedCategory = this.orderCategories.find((category) => category.id === id);
        const { name, description } = selectedCategory || {};
        this.categoryInput = { id, name, description };
    }

    onOpenNewModal() {
        this.onToggleModal();
        this.headerModal = 'New Category';
        this.categoryInput = { id: '', name: '', description: '' };
    }

    onConfirmDelete(event: Event, item: OrderCategory) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            closeOnEscape: true,
            dismissableMask: true,
            header: 'Delete Confirmation',
            message: `Do you want to delete <span class="font-semibold">${item.name}</span> category ?`,
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary'
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },

            accept: () => {
                this.spinner.show();
                this.categoryService.deleteCategory(item.id).subscribe(
                    (res: any) => {
                        this.spinner.hide();
                        this.getAllCategories();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: res.message
                        });
                    },
                    (err: HttpErrorResponse) => {
                        this.spinner.hide();
                        console.log(err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error.message
                        });
                    }
                );
            }
        });
    }

    onToggleModal() {
        this.displayModal = !this.displayModal;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onSaveCategory() {
        // Nambah kategori baru
        if (this.headerModal === 'New Category') {
            this.spinner.show();
            const { name, description } = this.categoryInput;
            this.categoryService.postNewCategory({ name, description }).subscribe(
                (res: any) => {
                    this.spinner.hide();
                    this.onToggleModal();
                    this.getAllCategories();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: res.message
                    });
                },
                (err: HttpErrorResponse) => {
                    this.spinner.hide();
                    console.log(err);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err.error.message
                    });
                }
            );
        }
        // Edit kategori
        else {
            this.spinner.show();
            const { id, name, description } = this.categoryInput;
            this.categoryService.putUpdateCategory(id, { name, description }).subscribe(
                (res: any) => {
                    this.spinner.hide();
                    this.onToggleModal();
                    this.getAllCategories();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: res.message
                    });
                },
                (err: HttpErrorResponse) => {
                    this.spinner.hide();
                    console.log(err);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err.error.message
                    });
                }
            );
        }
    }

    getAllCategories() {
        this.spinner.show();
        this.isLoadOrderCategory = true;
        this.categoryService.getAllCategories().subscribe((response: any) => {
            this.spinner.hide();
            this.orderCategories = response.data;
            this.isLoadOrderCategory = false;
        });
    }
}
