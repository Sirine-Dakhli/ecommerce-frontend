import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiInternauteUrl = 'http://localhost:8082/api/internaute'; // URL backend

  constructor(private http: HttpClient) {}

  inscrireClient(payload: any): Observable<any> {
    return this.http.post(`${this.apiInternauteUrl}/inscription-client`, payload);
  }
}
