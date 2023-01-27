import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tache } from '../models/Tache.model';

const baseUrl = 'http://localhost:8080/api/Taches';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tache[]> {
    return this.http.get<Tache[]>(baseUrl);
  }

  get(id: any): Observable<Tache> {
    return this.http.get<Tache>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${baseUrl}?title=${title}`);
  }
}