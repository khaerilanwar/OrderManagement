import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: 'admin',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'transaction', loadChildren: () => import('./app/views/admin/transaction/transaction.routes') },
            { path: 'project', loadChildren: () => import('./app/views/admin/project/project.routes') },
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
