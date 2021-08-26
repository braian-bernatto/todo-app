import { Todo } from "./todo.class"

export class TodoList {
  constructor() {
    this.loadLocalStorage()
  }

  nuevoTodo(todo) {
    this.todos.push(todo)
    this.saveLocalStorage()
  }

  eliminarTodo(id) {
    this.todos = this.todos.filter(todo => todo.id != id)
    this.saveLocalStorage()
  }

  marcarCompletado(id) {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completado = !todo.completado
        this.saveLocalStorage()
        break
      }
    }
  }

  eliminarCompletados() {
    this.todos = this.todos.filter(todo => !todo.completado)
    this.saveLocalStorage()
  }

  saveLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(this.todos))
  }

  loadLocalStorage() {
    this.todos = localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []
    this.todos = this.todos.map(Todo.fromJson)
  }
}
