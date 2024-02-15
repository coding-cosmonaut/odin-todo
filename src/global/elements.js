export function globalElements() {
  let taskBttn = document.querySelector("#task");
  let submitBttn = document.querySelector('button[type="submit"]');
  let cancelBttn = document.querySelector("#cancel");
  let form = document.querySelector("#new-task");
  let contentDiv = document.querySelector(".todo-content");
  
  return { taskBttn, submitBttn, cancelBttn, form, contentDiv };
}
