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
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    selector: 'public-regist',
    standalone: true,
    imports: [ButtonModule, InputTextModule, InputMaskModule, PasswordModule, FormsModule, RouterModule, RippleModule, ToastModule, CheckboxModule],
    template: `
        <p-toast class="font-medium" />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Halaman Pendaftaran</div>
                            <span class="text-muted-color font-medium">Isi formulir berikut</span>
                        </div>

                        <div class="w-full">
                            <div class="flex flex-col gap-4">
                                <div class="grid grid-cols-12 gap-4">
                                    <label for="name" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Nama</label>
                                    <div class="col-span-12 md:col-span-10">
                                        <input pInputText id="name" type="text" class="w-full md:w-[25rem]" placeholder="Nama panggilan" [(ngModel)]="name" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-12 gap-4">
                                    <label for="email" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Email</label>
                                    <div class="col-span-12 md:col-span-10">
                                        <input pInputText id="email" type="text" class="w-full md:w-[25rem]" placeholder="Alamat email" [(ngModel)]="email" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-12 gap-4">
                                    <label for="address" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Asal</label>
                                    <div class="col-span-12 md:col-span-10">
                                        <input pInputText id="address" type="text" class="w-full md:w-[25rem]" placeholder="Asal daerah" [(ngModel)]="address" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-12 gap-4">
                                    <label for="phone" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">No. HP</label>
                                    <div class="col-span-12 md:col-span-10">
                                        <p-inputmask mask="9999-9999-99999" [autoClear]="false" [unmask]="true" [(ngModel)]="phone" placeholder="0858-xxxx-xxxx" styleClass="w-full md:w-[25rem]" />
                                    </div>
                                </div>
                                <div class="flex justify-end mt-2">
                                    <p-checkbox inputId="registwa" [binary]="true" size="small" [(ngModel)]="whatsapp" [disabled]="!phone" />
                                    <label for="registwa" class="ml-2">Terdaftar di WhatsApp</label>
                                </div>
                            </div>

                            <p-button label="Daftar" styleClass="w-full mt-6" (click)="onRegist()" />

                            <p class="mt-4">Sudah punya akun? <a routerLink="/masuk" class="text-blue-400 font-semibold hover:underline">Masuk sekarang!</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [MessageService]
})
export class PublicRegist implements OnInit {
    name: string = '';
    email: string = '';
    address: string = '';
    phone: string = '';
    whatsapp: boolean = false;

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

    onRegist() {
        this.spinner.show();
        this.authService.customerRegister(this.name.trim(), this.email.trim(), this.address.trim(), this.phone.trim(), this.whatsapp).subscribe(
            (res: any) => {
                this.name = this.email = this.address = this.phone = '';
                this.whatsapp = false;
                this.spinner.hide();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Berhasil',
                    detail: 'Pendaftaran berhasil, silakan masuk untuk melanjutkan.'
                });
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

    checkInput() {
        // const customer = z.object({
        //     name: z.string().min(3, { message: 'Nama minimal 3 karakter' }),
        //     email: z.string().email({ message: 'Email tidak valid' }),
        //     address: z.string().min(3, { message: 'Asal minimal 3 karakter' }),
        //     phone: z.string().regex(/^\d{4}-\d{4}-\d{5}$/, { message: 'Format No. HP tidak valid' }),
        //     whatsapp: z.boolean()
        // });
        // const result = customer.safeParse({
        //     name: this.name,
        //     email: this.email,
        //     address: this.address,
        //     phone: this.phone,
        //     whatsapp: this.whatsapp
        // });
        // console.log(result.error);
    }
}
