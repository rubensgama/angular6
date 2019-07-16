import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from 'src/model/Todo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  private todos: Todo[];
  private newTodo: Todo = new Todo();
  constructor(private toastr: ToastrService, private todoService: TodoService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.todoService.list().subscribe(todos => {
      this.todos = todos;
    });
  }

  save() {
    this.newTodo.id = this.todos.length;
    this.newTodo.done = false;
    this.todoService.save(this.newTodo).subscribe(resp => {
      this.toastr.success('Saved successfully.');
      this.list();
    });
  }

  delete(todo: Todo) {
    this.todoService.delete(todo).subscribe(resp => {
      this.toastr.success('Deleted successfully.');
      this.list();
    });
  }

  update(todo: Todo) {
    this.todoService.update(todo).subscribe(resp => {
      this.toastr.success('Updated successfully.');
    });
  }
}
