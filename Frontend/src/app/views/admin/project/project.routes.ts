import { Routes } from '@angular/router';
import { BotAppComponent } from './bot-app/bot-app.component';
import { FullstackAppComponent } from './fullstack-app/fullstack-app.component';
import { MvcAppComponent } from './mvc-app/mvc-app.component';
export default [
    { path: 'bot-app', component: BotAppComponent },
    { path: 'fullstack-app', component: FullstackAppComponent },
    { path: 'mvc-app', component: MvcAppComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
