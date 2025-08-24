import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../services/admin/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ToastModule],
    template: `
        <p-toast class="font-medium" />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome Admin!</div>
                            <span class="text-muted-color font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label for="username" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
                            <input pInputText id="username" autofocus type="text" placeholder="Your username" autocomplete="off" class="w-full md:w-[30rem] mb-8" [(ngModel)]="username" />

                            <label for="password" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password" [(ngModel)]="password" placeholder="Password" autocomplete="off" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false" (keyup.enter)="onLogin()"></p-password>

                            <p-button label="Sign In" styleClass="w-full" (click)="onLogin()"></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [MessageService]
})
export class Login implements OnInit {
    username: string = '';
    password: string = '';

    constructor(
        private authService: AuthService,
        private spinner: NgxSpinnerService,
        private messageService: MessageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/admin']);
        }
    }

    onLogin() {
        if (!this.username.trim() || !this.password.trim()) {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Username and Password are required' });
            return;
        }
        this.spinner.show();
        this.authService.authenticate(this.username, this.password).subscribe(
            (response: any) => {
                this.spinner.hide();
                const token = response.data.accessToken;
                localStorage.setItem('token', token);
                this.router.navigate(['/admin']);
            },
            (error: HttpErrorResponse) => {
                this.spinner.hide();
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Warning',
                    detail: error.error.message
                });
            }
        );
    }
}
