import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getLists(): Observable<List[]> {
    const url = "http://localhost:3001/list";
    return this.http.get<List[]>(url);
  }

  getList(id: string): Observable<List> {
    const url = `http://localhost:3001/list/${id}`;
    return this.http.get<List>(url);
  }

  deleteList(id: string): Observable<object> {
    const url = `http://localhost:3001/list/${id}`;
    return this.http.delete<object>(url);
  }

  deleteLists(): Observable<object> {
    const url = "http://localhost:3001/list";
    return this.http.delete<object>(url);
  }

  addList(list: List): Observable<object> {
    const url = "http://localhost:3001/list";
    return this.http.post<object>(url, list);
  }

  editList(list: List, id: string): Observable<object> {
    const url = `http://localhost:3001/list/${id}`;
    return this.http.put<object>(url, list);
  }
}
