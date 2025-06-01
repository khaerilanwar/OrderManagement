import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../services/admin/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'public-login',
    standalone: true,
    imports: [ButtonModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ToastModule],
    template: `
        <p-toast class="font-medium" />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Selamat Datang!</div>
                            <span class="text-muted-color font-medium">Silakan masuk untuk melanjutkan</span>
                        </div>

                        <div>
                            <label for="customer" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email / No. HP</label>
                            <input pInputText id="customer" autofocus type="text" placeholder="Masukkan Email / No. HP yang terdaftar" autocomplete="off" class="w-full md:w-[25rem] mb-8" [(ngModel)]="customer_id" (keyup.enter)="onLogin()" />

                            <p-button class="ml-4" label="Masuk" (click)="onLogin()"></p-button>
                        </div>
                        <p class="indent-2">Belum punya akun? <a routerLink="/daftar" class="text-blue-400 font-semibold hover:underline">Daftar sekarang!</a></p>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [MessageService]
})
export class PublicLogin implements OnInit {
    customer_id: string = '';

    constructor(
        private authService: AuthService,
        private spinner: NgxSpinnerService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.authService.isAuthCustomer()) {
            this.router.navigate(['/']);
        }
    }

    onLogin() {
        this.spinner.show();
        this.authService.customerLogin(this.customer_id.trim()).subscribe(
            (res: any) => {
                this.spinner.hide();
                localStorage.setItem('token', res.data.accessToken);
                this.router.navigate(['/']);
            },
            (err: HttpErrorResponse) => {
                this.spinner.hide();
                this.messageService.add({
                    severity: 'error',
                    summary: 'Gagal',
                    detail: err.error.message
                });
            }
        );
    }
}
