import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from 'src/model/Todo';
import { ToastrService } from 'ngx-toastr';

/**
 * Front controller of todo tasks.
 */
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  /**
   * List of todos listed.
   */
  private todos: Todo[];
  /**
   * New todo used to register a new one.
   */
  private newTodo: Todo = new Todo();
  /**
   * Constructor.
   */
  constructor(private toastr: ToastrService, private todoService: TodoService) { }

  /**
   * Lists all todos on initialization.
   */
  ngOnInit() {
    this.list();
  }

  /**
   * Lists all todo objects.
   */
  list() {
    this.todoService.list().subscribe(todos => {
      this.todos = todos;
    });
  }

  /**
   * Saves a new todo.
   */
  save() {
    if (this.newTodo.description === undefined || this.newTodo.description.trim().length === 0) {
      this.toastr.error('Description is required.');
    } else {
      this.newTodo.id = this.todos.length;
      this.newTodo.done = false;
      this.todoService.save(this.newTodo).subscribe(resp => {
        this.toastr.success('Saved successfully.');
        this.list();
      });
      this.newTodo = new Todo();
    }
  }

  /**
   * Removes a selected todo.
   * @param todo Selected todo.
   */
  delete(todo: Todo) {
    this.todoService.delete(todo).subscribe(resp => {
      this.toastr.success('Deleted successfully.');
      this.list();
    });
  }

  /**
   * Update the done flag of a selected todo.
   * @param todo Selected todo.
   */
  update(todo: Todo) {
    this.todoService.update(todo).subscribe(resp => {
      this.toastr.success('Updated successfully.');
    });
  }
}
