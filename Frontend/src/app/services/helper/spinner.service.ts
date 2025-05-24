import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    public isLoading: boolean = false;
    constructor() {}

    public show() {
        this.isLoading = true;
    }
    public hide() {
        this.isLoading = false;
    }
}
