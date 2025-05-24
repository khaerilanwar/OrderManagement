import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    constructor(private http: HttpClient) {}

    getStatus() {
        return this.http.get('/status');
    }
}
