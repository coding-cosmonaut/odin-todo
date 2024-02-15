import "./style.css";
import { appendTodo } from "./modules/appendTodo";
import { addEvent } from "./modules/event";
import { toggleModal } from "./modules/modal";
import { getFormData } from "./modules/form";
import { createDiv } from "./modules/todoDOM";

(function app() {
  let taskBttn = document.querySelector("#task");
  let submitBttn = document.querySelector('button[type="submit"]');
  let form = document.querySelector("#new-task");
  let contentDiv = document.querySelector(".todo-content");
  addEvent(taskBttn, "click", toggleModal);
  addEvent(form, "submit", (e) => {
    e.preventDefault();
    let formData = getFormData(form);
    let newTodo = appendTodo(formData);

    contentDiv.append(createDiv(newTodo));
  });
})();
