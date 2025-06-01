import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { LicenseComponent } from './license/license.component';
export default [
    { path: '', component: CustomerListComponent },
    { path: 'license', component: LicenseComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
