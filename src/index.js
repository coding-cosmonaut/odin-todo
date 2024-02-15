import "./style.css";
import { createTodo } from "./modules/createTodo";
import { addEvent } from "./modules/event";
import { toggleModal } from "./modules/modal";
import { getFormData } from "./modules/form";
import { createDiv } from "./modules/todoDOM";
import { appendImage } from "./modules/appendAssets";
import { globalElements } from "./global/elements";

(function app() {
  let { taskBttn, cancelBttn, modal, wrapperForModal, form, contentDiv } =
    globalElements();
  appendImage();
  addEvent(taskBttn, "click", toggleModal);
  addEvent(cancelBttn, "click", toggleModal);
  addEvent(modal, "click", toggleModal);
  addEvent(wrapperForModal, "click", (e) => {
    e.stopPropagation();
  });
  addEvent(form, "submit", (e) => {
    e.preventDefault();
    let formData = getFormData(form);
    let newTodo = createTodo(formData);

    console.log(newTodo)

    contentDiv.append(createDiv(newTodo));
    form.reset();
    toggleModal();
  });
})();
