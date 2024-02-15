import Todo from "./todo";

export function createTodo(formValue) {
  let data = Object.fromEntries(formValue);

  let newTodo = new Todo(
    data.title,
    data.description,
    data.dueDate,
    data.priority
  );
  return newTodo;
}
