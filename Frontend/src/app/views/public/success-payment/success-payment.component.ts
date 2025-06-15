import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-payment',
  imports: [],
  templateUrl: './success-payment.component.html',
  styleUrl: './success-payment.component.scss'
})
export class SuccessPaymentComponent implements OnInit, OnDestroy {

  constructor(private router: Router) { }

  ngOnInit(): void {
    document.body.classList.add('overflow-hidden');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('overflow-hidden');
  }

  redirectToOrder() {
    this.router.navigate(['/my-order']);
  }

}
