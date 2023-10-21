import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    const url = 'http://localhost:3001/Todos';
    return this.http.get<Todo[]>(url);
  }

  getTodo(id: number): Observable<Todo> {
    const url = `http://localhost:3001/Todos/${id}`;
    return this.http.get<Todo>(url);
  }

  searchItem(keyword: string): Observable<Todo[]> {
    const url = `http://localhost:3001/Todos/search/${keyword}`;
    return this.http.get<Todo[]>(url);
  }
}
