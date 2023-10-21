import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Array<Todo> = [];
  searchTodos: Array<Todo> = [];
  keyword = "";

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.getTodos();
    this.searchItem(this.keyword);
  }

  getTodos() {
    this.todosService.getTodos().subscribe((todos) => {
      this.searchTodos = todos;
    })
  }

  searchItem(keyword: string) {
    this.todosService.searchItem(keyword).subscribe((searchTodos) => {
      this.searchTodos = searchTodos;
    })
  }


}
