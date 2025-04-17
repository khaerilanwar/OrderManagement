import { Routes } from '@angular/router';
import { OrderCategoryComponent } from './order-category/order-category.component';
import { OrderListComponent } from './order-list/order-list.component';
export default [
    { path: 'order-category', component: OrderCategoryComponent },
    { path: 'order-list', component: OrderListComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
