import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { OrderService } from '../../../../services/admin/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-report',
  imports: [ButtonModule, DatePickerModule, FormsModule],
  templateUrl: './order-report.component.html',
  styleUrl: './order-report.component.scss',
  providers: [DatePipe],
})
export class OrderReportComponent {
  startDate!: any
  endDate!: any

  constructor(
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) { }

  downloadReport() {
    this.spinner.show();
    const startReport = this.startDate ? this.datePipe.transform(this.startDate, 'yyyy-MM-dd') : '';
    const endReport = this.endDate ? this.datePipe.transform(this.endDate, 'yyyy-MM-dd') : '';
    this.orderService.downloadOrderReport(startReport, endReport).subscribe(
      (res: Blob) => {

        const blob = new Blob(
          [res],
          { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
        )
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', downloadUrl);
        link.setAttribute(
          'download',
          `report-${this.datePipe.transform(new Date(), 'yyyy-MM-dd HHMM')}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to download report. Please try again later.'
        })
      }
    )
  }
}
