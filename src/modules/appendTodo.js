import Todo from "./todo";

export function appendTodo(formValue) {
  let data = Object.fromEntries(formValue);

  let newTodo = new Todo(data.title);
  return newTodo;
}
