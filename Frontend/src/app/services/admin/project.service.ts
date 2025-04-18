import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  urlEndpoint: string = environment.apiUrl + 'products'

  constructor(private http: HttpClient) { }

  getAllProjects() {
    this.http.get(this.urlEndpoint)
  }
}
