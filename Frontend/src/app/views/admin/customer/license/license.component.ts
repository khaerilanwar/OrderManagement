import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table, TableModule } from 'primeng/table';
import { CustomerService } from '../../../../services/admin/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DrawerModule } from 'primeng/drawer';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-license',
  imports: [DatePickerModule, DialogModule, TableModule, SelectModule, DrawerModule, InputTextModule, ButtonModule, IconFieldModule, InputIconModule, InputNumberModule, DialogModule, TextareaModule, FormsModule, DatePipe],
  templateUrl: './license.component.html',
  styleUrl: './license.component.scss'
})
export class LicenseComponent implements OnInit {
  tokenLicense: any[] = [];
  headerModal: string = '';
  displayModal: boolean = false;
  displayDrawer: boolean = false;

  nameToken: string | undefined
  customers: any[] | undefined;
  customerToken: any | undefined
  limitToken: number | undefined;
  expireToken: Date | undefined;
  descriptionToken: string | undefined;
  minExpireDate: Date = new Date();

  infoDetailToken: any | undefined;
  infoToken: string | undefined
  tokenIdSelected: string | undefined

  constructor(
    private customerService: CustomerService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllTokenLicenses();
    this.getAllCustomers();
  }

  onToggleModal(type: string = '', arg: string = '') {
    this.displayModal = !this.displayModal;
    if (type === 'edit') {
      this.headerModal = 'License Edit';
      this.tokenIdSelected = arg
      this.expireToken = new Date(
        this.tokenLicense.find(
          item => item.id === this.tokenIdSelected
        ).expire_date ?? ''
      )

      if (!this.displayModal) {
        this.onClearNewToken();
        this.tokenIdSelected = undefined
      }
    } else if (type === 'info' && this.displayModal) {
      this.headerModal = 'Token Info'
      this.infoToken = arg
    }
  }

  onToggleDrawer() {
    this.displayDrawer = !this.displayDrawer;
    if (this.displayDrawer) {
      this.onClearNewToken();
      this.infoDetailToken = undefined;
      this.tokenIdSelected = undefined;
    }
  }

  onClearNewToken() {
    this.nameToken =
      this.descriptionToken =
      this.customerToken =
      this.limitToken =
      this.expireToken = undefined
  }

  onOpenNewModal() {

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(
      (res: any) => {
        this.customers = res.data.map(
          (customer: any) => ({
            name: customer.name,
            id: customer.id,
          })
        )
      }
    )
  }

  getAllTokenLicenses() {
    this.spinner.show()
    this.customerService.getAllTokenLicenses().subscribe(
      (res: any) => {
        this.spinner.hide();
        this.tokenLicense = res.data
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        console.log(err.error);
      }
    )
  }

  changeLicense() {
    this.spinner.show()
    this.customerService.changeTokenLicense(
      this.tokenIdSelected ?? '',
      this.limitToken ?? 0,
      this.expireToken ?? new Date()
    ).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.getAllTokenLicenses();
        this.onToggleModal()
        this.messageService.add({
          severity: 'success',
          summary: 'Error',
          detail: res.message
        })
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide()
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message
        })
      }
    )
  }

  createNewToken() {
    this.spinner.show();
    this.customerService.createNewTokenLicense(
      this.nameToken ?? '',
      this.descriptionToken ?? '',
      this.customerToken.id ?? '',
      this.limitToken ?? 0,
      this.expireToken ?? new Date()
    ).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.onToggleDrawer();
        this.getAllTokenLicenses();
        this.onToggleModal('info', res.data.token)
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message
        })
      }
    )
  }
}
