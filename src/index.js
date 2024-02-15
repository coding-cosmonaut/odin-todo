import "./style.css";
import { appendTodo } from "./modules/appendTodo";
import { addEvent } from "./modules/event";
import { toggleModal } from "./modules/modal";
import { getFormData } from "./modules/form";
import { createDiv } from "./modules/todoDOM";
import { appendImage } from "./modules/appendAssets";
import { globalElements } from "./global/elements";

(function app() {
  let globalDOM = globalElements();
  appendImage();
  addEvent(globalDOM.taskBttn, "click", toggleModal);
  addEvent(globalDOM.cancelBttn, "click", toggleModal);

  addEvent(globalDOM.form, "submit", (e) => {
    e.preventDefault();
    let formData = getFormData(globalDOM.form);
    let newTodo = appendTodo(formData);

    globalDOM.contentDiv.append(createDiv(newTodo));
    globalDOM.form.reset();
    toggleModal();
  });
})();
