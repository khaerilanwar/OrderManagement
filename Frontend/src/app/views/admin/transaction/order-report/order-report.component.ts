import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-order-report',
  imports: [ButtonModule, DatePickerModule, FormsModule],
  templateUrl: './order-report.component.html',
  styleUrl: './order-report.component.scss'
})
export class OrderReportComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor() { }

  generateReport(): void {
    if (this.startDate && this.endDate) {
      // Logic to generate report based on the selected date range
      console.log(`Generating report from ${this.startDate} to ${this.endDate}`);
    } else {
      console.error('Please select both start and end dates.');
    }
  }

  last30days() {

  }
}
