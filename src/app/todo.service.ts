import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from 'src/model/Todo';

/**
 * Service to implement crud operations on the todo domain object.
 * It's responsible to interact with the restful remote services in 
 * backend grails project.
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /**
   * Constructor
   * @param http Http client instance. 
   */
  constructor(private http: HttpClient) { }

  /**
   * Searches all todos.
   */
  list(): Observable<Todo[]> {
    const options = {};
    const url = '/api/todos';
    return this.http.get(url, options) as Observable<Todo[]>;
  }

  /**
   * Updates a specific todo.
   * @param todo 
   */
  update(todo: Todo): Observable<any> {
    const options = {};
    const url = '/api/todos/'.concat(todo.id.toString());
    return this.http.put(url, todo, options);
  }

  /**
   * Deletes a specific todo.
   * @param todo 
   */
  delete(todo: Todo): Observable<any> {
    const options = {};
    const url = '/api/todos/'.concat(todo.id.toString());
    return this.http.delete(url, options);
  }

  /**
   * Creates a new todo.
   * @param todo 
   */
  save(todo: Todo): Observable<any> {
    const options = {};
    const url = '/api/todos';
    return this.http.post(url, todo, options);
  }
}
