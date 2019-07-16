import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from 'src/model/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Todo[]> {
    const options = {};
    const url = '/api/todos';
    return this.http.get(url, options) as Observable<Todo[]>;
  }

  update(todo: Todo): Observable<any> {
    const options = {};
    const url = '/api/todos/'.concat(todo.id.toString());
    return this.http.put(url, todo, options);
  }

  delete(todo: Todo): Observable<any> {
    const options = {};
    const url = '/api/todos/'.concat(todo.id.toString());
    return this.http.delete(url, options);
  }

  save(todo: Todo): Observable<any> {
    const options = {};
    const url = '/api/todos';
    return this.http.post(url, todo, options);
  }
}
