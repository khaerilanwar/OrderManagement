import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
export default [
    { path: 'list', component: ProductListComponent },
    { path: 'category', component: ProductCategoryComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
