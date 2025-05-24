import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { HomeComponent } from './app/views/public/home/home.component';
import { Login } from './app/views/auth/login';
import { authGuard } from './app/guards/auth.guard';

export const appRoutes: Routes = [
    // public
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'bot-app', loadChildren: () => import('./app/views/public/bot-app/bot.routes') },
            { path: 'web-app', loadChildren: () => import('./app/views/public/web-app/web.routes') }
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
            { path: 'project', loadChildren: () => import('./app/views/admin/project/project.routes') }
        ]
    },
    { path: 'login', component: Login },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
