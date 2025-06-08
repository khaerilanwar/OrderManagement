import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, NgxSpinnerModule, ToastModule],
    template: `
        <p-toast class="font-medium" />
        <ngx-spinner type="ball-scale-multiple"></ngx-spinner>
        <router-outlet></router-outlet>
    `,
    providers: [MessageService]
})
export class AppComponent {
    constructor() { }
}
