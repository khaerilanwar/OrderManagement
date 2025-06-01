import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from './app/views/auth/login';
import { authGuard } from './app/guards/auth.guard';
import { Landing } from './app/layout/landing/landing';
import { PublicLogin } from './app/views/auth/public-login';
import { PublicRegist } from './app/views/auth/public-regist';

export const appRoutes: Routes = [
    // public
    {
        path: '',
        component: Landing,
        children: [
            { path: '', loadChildren: () => import('./app/views/public/public.routes') }
        ]
    },
    // admin
    {
        canActivate: [authGuard],
        path: 'admin',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'order', loadChildren: () => import('./app/views/admin/transaction/transaction.routes') },
            { path: 'project', loadChildren: () => import('./app/views/admin/project/project.routes') },
            { path: 'customer', loadChildren: () => import('./app/views/admin/customer/customer.routes') },
        ]
    },
    // public
    { path: 'masuk', component: PublicLogin },
    { path: 'daftar', component: PublicRegist },
    // admin
    { path: 'login', component: Login },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
