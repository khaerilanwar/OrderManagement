import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { OrderService } from '../../../services/public/order.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-testimoni',
  imports: [PanelModule, RatingModule, FormsModule, ButtonModule, MenuModule, DatePipe],
  templateUrl: './testimoni.component.html',
  styleUrl: './testimoni.component.scss'
})
export class TestimoniComponent implements OnInit {

  testimoni: any[] = []
  rating: number = 5;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getAllTestimoni();
  }

  getAllTestimoni() {
    this.orderService.getAllTestimoniOrders().subscribe(
      (res: any) => {
        this.testimoni = res.data;
      }
    )
  }
}
