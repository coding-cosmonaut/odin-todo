import { collectionOfTodos } from "../global/allProjects";
import Todo from "./todo";

function createTodo(formValue) {
  let data = Object.fromEntries(formValue);

  let newTodo = new Todo(
    data.title,
    data.description,
    data.dueDate,
    data.priority,
    data.project
  );
  return newTodo;
}

function checkDuplicateTodoTitle(input) {
  return collectionOfTodos.every((item) => item.title !== input.value);
}

export { checkDuplicateTodoTitle, createTodo };
