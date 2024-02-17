import "./style.css";
import { createTodo } from "./modules/createTodo";
import { addEvent } from "./modules/event";
import { toggleModal, switchModalForm } from "./modules/modal";
import { getFormData } from "./modules/form";
import { createDiv } from "./modules/todoDOM";
import { appendImage } from "./modules/appendAssets";
import { globalElements } from "./global/elements";

(function app() {
  const {
    taskBttn,
    cancelBttn,
    modal,
    wrapperForModal,
    form,
    contentDiv,
    todoFormBttn,
    projectFormBttn,
    formProjectWrap,
    formTodoWrap,
  } = globalElements();
  appendImage();
  addEvent(taskBttn, "click", toggleModal);
  addEvent([todoFormBttn, projectFormBttn], "click", function () {
    const currentThis = this;
    switchModalForm(currentThis, formProjectWrap, formTodoWrap);
  });
  addEvent(cancelBttn, "click", toggleModal);
  addEvent(modal, "click", toggleModal);
  addEvent(wrapperForModal, "click", (e) => {
    e.stopPropagation();
  });
  addEvent(form, "submit", (e) => {
    console.log("run");
    e.preventDefault();
    let formData = getFormData(form);
    let newTodo = createTodo(formData);

    contentDiv.append(createDiv(newTodo));
    form.reset();
    toggleModal();
  });
})();
