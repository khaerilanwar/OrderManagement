import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../services/admin/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { StatusService } from '../../../../services/admin/status.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';

interface Status {
    name: string;
    id: number;
}

@Component({
    selector: 'app-order-detail',
    imports: [NgIf, CardModule, CheckboxModule, InputNumberModule, FormsModule, SelectModule, InputTextModule, TextareaModule, DialogModule, AccordionModule, BadgeModule, ButtonModule, CurrencyPipe, DatePipe],
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
    order: any;
    orderId: string = '';
    openModal: boolean = false;
    headerModal: string = '';
    descriptionEdit: string = '';
    status: Status[] = [];
    selectedStatus: Status | undefined;
    amountPaid: number = 0;
    invoice: number = 0;
    showInputChangeStatus: boolean = false;
    useDefaultNotes: boolean = false;
    statusNotes: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private orderService: OrderService,
        private statusService: StatusService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.orderId = this.route.snapshot.params['id'];
        this.getOrderDetail(this.orderId);
        this.getAllStatus();
    }

    toggleModal() {
        this.openModal = !this.openModal;
    }

    onChangeStatus() {
        if (this.order.status.detail != this.selectedStatus?.name) {
            this.showInputChangeStatus = true;
        } else {
            this.showInputChangeStatus = false;
        }
    }

    onDelete() {
        this.spinner.show();
        this.orderService.deleteOrder(this.orderId).subscribe(
            (res: any) => {
                this.spinner.hide();
                this.router.navigate(['/admin/order/list']);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message
                });
            },
            (err: HttpErrorResponse) => {
                this.spinner.hide();
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.error.message || 'An error occurred while deleting the order.'
                });
            }
        );
    }

    onOpenModal(type: string) {
        this.toggleModal();
        this.headerModal = type === 'order' ? 'Edit Order' : 'Edit Invoice';
    }

    onSaveModal() {
        if (this.headerModal === 'Edit Order') {
            const data = {
                status: this.selectedStatus?.id,
                description: this.descriptionEdit,
                statusNotes: this.statusNotes
            };

            this.spinner.show();
            this.orderService.editOrder(this.orderId, data).subscribe(
                (res: any) => {
                    this.spinner.hide();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: res.message
                    });
                    this.getOrderDetail(this.orderId);
                },
                (err: HttpErrorResponse) => {
                    this.spinner.hide();
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: err.message
                    });
                }
            );
        } else if (this.headerModal === 'Edit Invoice') {
            const data = {
                invoice: this.invoice,
                downPayment: this.amountPaid
            };
            this.spinner.show();
            this.orderService.editInvoice(this.orderId, data).subscribe(
                (res: any) => {
                    this.spinner.hide();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: res.message
                    });
                    this.getOrderDetail(this.orderId);
                },
                (err: HttpErrorResponse) => {
                    this.spinner.hide();
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: err.message
                    });
                }
            );
        }

        this.toggleModal();
    }

    getOrderDetail(id: string) {
        this.spinner.show();
        this.orderService.getOrderById(id).subscribe(
            (res: any) => {
                this.spinner.hide();
                this.order = res.data;
                this.descriptionEdit = res.data.description;
                this.selectedStatus = { id: res.data.status.id, name: res.data.status.detail };
                this.invoice = res.data.invoice;
            },
            (err: HttpErrorResponse) => {
                this.spinner.hide();
                if (err.status === 404) {
                    this.router.navigate(['/notfound']);
                }
            }
        );
    }

    getAllStatus() {
        this.statusService.getStatus().subscribe((res: any) => {
            this.status = res.data.map((item: any) => ({
                name: item.detail,
                id: item.id
            }));
        });
    }

    getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
        switch (status) {
            case 'Baru':
                return 'info';
            case 'Bayar':
                return 'warn';
            case 'Konfirmasi':
                return 'secondary';
            case 'Diproses':
                return 'contrast';
            case 'Selesai':
                return 'success';
            case 'Batal':
                return 'danger';
            default:
                return 'secondary';
        }
    }
}
