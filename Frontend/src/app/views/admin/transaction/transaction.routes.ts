import { Routes } from '@angular/router';
import { OrderCategoryComponent } from './order-category/order-category.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderReportComponent } from './order-report/order-report.component';
export default [
    { path: 'category', component: OrderCategoryComponent },
    { path: 'list', component: OrderListComponent },
    { path: 'report', component: OrderReportComponent },
    { path: 'detail/:id', component: OrderDetailComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
