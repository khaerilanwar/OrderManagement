import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table, TableModule } from 'primeng/table';

@Component({
  selector: 'app-topup',
  imports: [ConfirmDialogModule, DialogModule, ButtonModule, TableModule, IconFieldModule, InputIconModule, DatePipe, FormsModule],
  templateUrl: './topup.component.html',
  styleUrl: './topup.component.scss'
})
export class TopupComponent implements OnInit {
  displayModal: boolean = false;
  topUps: any[] = [];
  selectedTopUp: any = null;

  constructor() { }
  ngOnInit(): void {

  }

  openModal(topUp: any) {

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  confirmTopup() {

  }

  getAllTopups() {

  }
}
